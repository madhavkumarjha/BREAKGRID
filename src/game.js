/* Breakout Main Game Engine */
import { soundEngine } from './audio.js';
import { ParticleEngine } from './particles.js';
import { LEVELS, BRICK_TYPES, BRICK_COLORS } from './levels.js';
import { POWERUP_TYPES, PowerUpItem } from './powerups.js';

export class BreakoutGame {
    constructor(canvas, hudElements, overlayElements) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.hud = hudElements;
        this.overlays = overlayElements;

        this.particles = new ParticleEngine();

        // Canvas dimensions & scale
        this.width = 800;
        this.height = 600;

        // Game State
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('breakout_high_score') || '0');
        this.lives = 3;
        this.combo = 0;
        this.currentLevelIndex = 0;
        this.gameState = 'MENU'; // MENU, PLAYING, PAUSED, GAME_OVER, WIN

        // Screen Shake
        this.shakeTimer = 0;
        this.shakeMagnitude = 0;

        // Paddle
        this.paddle = {
            x: 340,
            y: 550,
            width: 120,
            baseWidth: 120,
            height: 16,
            color: '#00f0ff',
            speed: 9,
            vx: 0,
            sticky: false,
            lasersActive: false,
            lastLaserTime: 0
        };

        // Active Balls
        this.balls = [];

        // Active Lasers
        this.lasers = [];

        // Falling Powerup Items
        this.powerupItems = [];
        this.activePowerups = new Map(); // key -> expireTime

        // Bottom Energy Shield
        this.hasBottomShield = false;

        // Bricks Array
        this.bricks = [];

        // Boss Object (for Boss levels)
        this.boss = null;

        // Key states
        this.keys = { left: false, right: false, space: false };

        this.initEvents();
    }

    initEvents() {
        // Keyboard Listener
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = true;
            if (e.key === ' ') {
                this.keys.space = true;
                this.handleSpacePress();
            }
            if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
                this.togglePause();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = false;
            if (e.key === ' ') this.keys.space = false;
        });

        // Pointer / Mouse Control
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.gameState !== 'PLAYING') return;
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (this.width / rect.width);
            this.paddle.x = Math.max(0, Math.min(this.width - this.paddle.width, mouseX - this.paddle.width / 2));
        });

        this.canvas.addEventListener('click', () => {
            if (this.gameState === 'PLAYING') {
                this.handleSpacePress();
            }
        });

        // Touch Control
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.gameState !== 'PLAYING') return;
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const touchX = (touch.clientX - rect.left) * (this.width / rect.width);
            this.paddle.x = Math.max(0, Math.min(this.width - this.paddle.width, touchX - this.paddle.width / 2));
        }, { passive: false });

        this.canvas.addEventListener('touchstart', (e) => {
            if (this.gameState === 'PLAYING') {
                this.handleSpacePress();
            }
        });
    }

    handleSpacePress() {
        // Launch stuck balls
        for (const ball of this.balls) {
            if (ball.stuck) {
                ball.stuck = false;
                ball.vy = -ball.speed;
                ball.vx = (Math.random() - 0.5) * 4;
            }
        }

        // Fire Laser if active
        if (this.paddle.lasersActive && Date.now() - this.paddle.lastLaserTime > 300) {
            this.fireLasers();
            this.paddle.lastLaserTime = Date.now();
        }
    }

    fireLasers() {
        this.lasers.push(
            { x: this.paddle.x + 10, y: this.paddle.y, vy: -12 },
            { x: this.paddle.x + this.paddle.width - 10, y: this.paddle.y, vy: -12 }
        );
        soundEngine.playLaser();
    }

    startNewGame() {
        this.score = 0;
        this.lives = 3;
        this.combo = 0;
        this.currentLevelIndex = 0;
        this.loadLevel(this.currentLevelIndex);
        this.gameState = 'PLAYING';
        this.updateHUD();
        this.overlays.hideAll();
    }

    loadLevel(levelIndex) {
        this.currentLevelIndex = levelIndex;
        const level = LEVELS[levelIndex];
        this.bricks = [];
        this.powerupItems = [];
        this.lasers = [];
        this.activePowerups.clear();
        this.hasBottomShield = false;
        this.paddle.width = this.paddle.baseWidth;
        this.paddle.lasersActive = false;
        this.paddle.sticky = false;
        this.particles.clear();

        const padding = 12;
        const marginTop = 60;
        const marginLeft = 35;
        const brickWidth = (this.width - marginLeft * 2 - (level.cols - 1) * padding) / level.cols;
        const brickHeight = 24;

        for (let r = 0; r < level.rows; r++) {
            for (let c = 0; c < level.cols; c++) {
                const colorKey = level.grid[r][c];
                if (colorKey === 'EMPTY') continue;

                const typeKey = level.types[r][c] || 'N';
                let type = BRICK_TYPES.NORMAL;
                let hp = 1;

                if (typeKey === 'R') { type = BRICK_TYPES.REINFORCED; hp = 2; }
                else if (typeKey === 'U') { type = BRICK_TYPES.UNBREAKABLE; hp = Infinity; }
                else if (typeKey === 'E') { type = BRICK_TYPES.EXPLOSIVE; hp = 1; }
                else if (typeKey === 'P') { type = BRICK_TYPES.POWERUP; hp = 1; }

                this.bricks.push({
                    x: marginLeft + c * (brickWidth + padding),
                    y: marginTop + r * (brickHeight + padding),
                    width: brickWidth,
                    height: brickHeight,
                    color: BRICK_COLORS[colorKey] || '#00f0ff',
                    type: type,
                    hp: hp,
                    maxHp: hp
                });
            }
        }

        // Setup Boss if level is Boss Level
        if (level.isBoss) {
            this.boss = {
                x: this.width / 2 - 60,
                y: 90,
                width: 120,
                height: 50,
                hp: level.bossHp,
                maxHp: level.bossHp,
                vx: 2,
                color: '#ff0055'
            };
        } else {
            this.boss = null;
        }

        this.resetBalls();
    }

    resetBalls() {
        this.balls = [{
            x: this.paddle.x + this.paddle.width / 2,
            y: this.paddle.y - 12,
            radius: 8,
            vx: 4,
            vy: -6,
            speed: 7,
            stuck: true,
            isFireball: false
        }];
    }

    triggerScreenShake(magnitude = 8) {
        this.shakeTimer = 15;
        this.shakeMagnitude = magnitude;
    }

    update() {
        if (this.gameState !== 'PLAYING') return;

        // Screen shake decay
        if (this.shakeTimer > 0) this.shakeTimer--;

        // Update Paddle Position via Keys
        if (this.keys.left) {
            this.paddle.x = Math.max(0, this.paddle.x - this.paddle.speed);
        }
        if (this.keys.right) {
            this.paddle.x = Math.min(this.width - this.paddle.width, this.paddle.x + this.paddle.speed);
        }

        // Update Active Powerups Timers
        const now = Date.now();
        for (const [key, expireTime] of this.activePowerups.entries()) {
            if (now >= expireTime) {
                this.activePowerups.delete(key);
                if (key === 'ENLARGE') this.paddle.width = this.paddle.baseWidth;
                if (key === 'LASER') this.paddle.lasersActive = false;
                if (key === 'MAGNET') this.paddle.sticky = false;
                if (key === 'FIREBALL') {
                    this.balls.forEach(b => b.isFireball = false);
                }
            }
        }
        this.hud.updatePowerupBadges(this.activePowerups);

        // Update Lasers
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const laser = this.lasers[i];
            laser.y += laser.vy;

            // Check collision with bricks
            let hit = false;
            for (const brick of this.bricks) {
                if (brick.hp > 0 && this.rectOverlap(laser, { x: laser.x, y: laser.y, width: 4, height: 12 }, brick)) {
                    hit = true;
                    this.damageBrick(brick);
                    break;
                }
            }

            // Check collision with boss
            if (!hit && this.boss && this.boss.hp > 0) {
                if (this.rectOverlap(laser, { x: laser.x, y: laser.y, width: 4, height: 12 }, this.boss)) {
                    hit = true;
                    this.boss.hp -= 2;
                    soundEngine.playBrickHit(1.5);
                    this.particles.createBrickExplosion(this.boss.x, this.boss.y, this.boss.width, this.boss.height, '#ff0055');
                    if (this.boss.hp <= 0) this.handleBossDefeated();
                }
            }

            if (hit || laser.y < 0) {
                this.lasers.splice(i, 1);
            }
        }

        // Update Powerup Items Drops
        for (let i = this.powerupItems.length - 1; i >= 0; i--) {
            const item = this.powerupItems[i];
            item.update();

            // Catch item with paddle
            if (item.y + item.height >= this.paddle.y &&
                item.x + item.width >= this.paddle.x &&
                item.x <= this.paddle.x + this.paddle.width &&
                item.y <= this.paddle.y + this.paddle.height) {

                this.applyPowerUp(item.type);
                soundEngine.playPowerup();
                this.particles.addFloatingText(item.type.name, item.x, item.y, item.type.color);
                this.powerupItems.splice(i, 1);
                continue;
            }

            if (item.y > this.height) {
                this.powerupItems.splice(i, 1);
            }
        }

        // Update Balls
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const ball = this.balls[i];

            if (ball.stuck) {
                ball.x = this.paddle.x + this.paddle.width / 2;
                ball.y = this.paddle.y - ball.radius;
                continue;
            }

            // Add particle trail
            if (Math.random() > 0.4) {
                this.particles.createBallTrail(ball.x, ball.y, '#00f0ff', ball.isFireball);
            }

            ball.x += ball.vx;
            ball.y += ball.vy;

            // Wall Collisions
            if (ball.x - ball.radius <= 0) {
                ball.x = ball.radius;
                ball.vx *= -1;
                soundEngine.playPaddleHit(0.2);
            }
            if (ball.x + ball.radius >= this.width) {
                ball.x = this.width - ball.radius;
                ball.vx *= -1;
                soundEngine.playPaddleHit(0.8);
            }
            if (ball.y - ball.radius <= 0) {
                ball.y = ball.radius;
                ball.vy *= -1;
                soundEngine.playPaddleHit(0.5);
            }

            // Paddle Collision
            if (ball.vy > 0 &&
                ball.y + ball.radius >= this.paddle.y &&
                ball.y - ball.radius <= this.paddle.y + this.paddle.height &&
                ball.x >= this.paddle.x &&
                ball.x <= this.paddle.x + this.paddle.width) {

                if (this.paddle.sticky) {
                    ball.stuck = true;
                } else {
                    // Angle ball based on where it hit the paddle
                    const hitPos = (ball.x - (this.paddle.x + this.paddle.width / 2)) / (this.paddle.width / 2);
                    const maxAngle = Math.PI / 3; // 60 degrees
                    const bounceAngle = hitPos * maxAngle;
                    const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);

                    ball.vx = speed * Math.sin(bounceAngle);
                    ball.vy = -speed * Math.cos(bounceAngle);
                }

                soundEngine.playPaddleHit((ball.x - this.paddle.x) / this.paddle.width);
                this.combo = 0; // reset combo multiplier on paddle hit
                this.updateHUD();
            }

            // Bottom Shield Collision
            if (this.hasBottomShield && ball.y + ball.radius >= this.height - 10) {
                ball.vy *= -1;
                this.hasBottomShield = false; // consume shield
                soundEngine.playExplosion();
                this.triggerScreenShake(5);
            }

            // Ball lost below canvas
            if (ball.y - ball.radius > this.height) {
                this.balls.splice(i, 1);
            }

            // Brick Collisions
            for (const brick of this.bricks) {
                if (brick.hp <= 0) continue;

                if (this.circleRectOverlap(ball, brick)) {
                    if (!ball.isFireball || brick.type === BRICK_TYPES.UNBREAKABLE) {
                        // Reflect ball
                        const prevX = ball.x - ball.vx;
                        const prevY = ball.y - ball.vy;

                        if (prevX + ball.radius <= brick.x || prevX - ball.radius >= brick.x + brick.width) {
                            ball.vx *= -1;
                        } else {
                            ball.vy *= -1;
                        }
                    }

                    this.damageBrick(brick);
                    break;
                }
            }

            // Boss Collision
            if (this.boss && this.boss.hp > 0 && this.circleRectOverlap(ball, this.boss)) {
                ball.vy *= -1;
                this.boss.hp -= 5;
                soundEngine.playBrickHit(1.8);
                this.particles.createBrickExplosion(this.boss.x, this.boss.y, this.boss.width, this.boss.height, '#ff0055');
                if (this.boss.hp <= 0) this.handleBossDefeated();
            }
        }

        // Update Boss Movement
        if (this.boss && this.boss.hp > 0) {
            this.boss.x += this.boss.vx;
            if (this.boss.x <= 50 || this.boss.x + this.boss.width >= this.width - 50) {
                this.boss.vx *= -1;
            }
        }

        // If all balls lost
        if (this.balls.length === 0) {
            this.lives--;
            soundEngine.playLifeLost();
            this.triggerScreenShake(10);
            this.updateHUD();

            if (this.lives <= 0) {
                this.handleGameOver();
            } else {
                this.resetBalls();
            }
        }

        // Check level cleared
        const remainingBricks = this.bricks.filter(b => b.hp > 0 && b.type !== BRICK_TYPES.UNBREAKABLE);
        if (remainingBricks.length === 0 && (!this.boss || this.boss.hp <= 0)) {
            this.handleLevelCompleted();
        }

        this.particles.update();
    }

    applyPowerUp(type) {
        if (type.id === 'MULTIBALL') {
            const count = this.balls.length;
            for (let i = 0; i < 2; i++) {
                if (count > 0) {
                    const base = this.balls[0];
                    this.balls.push({
                        x: base.x,
                        y: base.y,
                        radius: 8,
                        vx: (Math.random() - 0.5) * 8,
                        vy: -Math.abs(base.vy),
                        speed: base.speed,
                        stuck: false,
                        isFireball: base.isFireball
                    });
                }
            }
        } else if (type.id === 'ENLARGE') {
            this.paddle.width = this.paddle.baseWidth * 1.5;
            this.activePowerups.set(type.id, Date.now() + type.duration);
        } else if (type.id === 'LASER') {
            this.paddle.lasersActive = true;
            this.activePowerups.set(type.id, Date.now() + type.duration);
        } else if (type.id === 'FIREBALL') {
            this.balls.forEach(b => b.isFireball = true);
            this.activePowerups.set(type.id, Date.now() + type.duration);
        } else if (type.id === 'MAGNET') {
            this.paddle.sticky = true;
            this.activePowerups.set(type.id, Date.now() + type.duration);
        } else if (type.id === 'SHIELD') {
            this.hasBottomShield = true;
        } else if (type.id === 'SLOW') {
            this.balls.forEach(b => {
                b.vx *= 0.7;
                b.vy *= 0.7;
            });
            this.activePowerups.set(type.id, Date.now() + type.duration);
        }
    }

    damageBrick(brick) {
        if (brick.type === BRICK_TYPES.UNBREAKABLE) {
            soundEngine.playPaddleHit(0.5);
            return;
        }

        brick.hp--;
        this.combo++;

        const pts = 100 * this.combo;
        this.score += pts;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('breakout_high_score', this.highScore.toString());
        }

        this.particles.createBrickExplosion(brick.x, brick.y, brick.width, brick.height, brick.color);
        this.particles.addFloatingText(`+${pts}`, brick.x + brick.width / 2, brick.y, brick.color);

        if (brick.hp <= 0) {
            soundEngine.playBrickHit(1 + (this.combo * 0.05));

            // Explosive brick AoE damage
            if (brick.type === BRICK_TYPES.EXPLOSIVE) {
                soundEngine.playExplosion();
                this.triggerScreenShake(8);
                this.particles.createExplosiveBlast(brick.x + brick.width / 2, brick.y + brick.height / 2);
                this.explodeAdjacentBricks(brick);
            }

            // Powerup Brick Drop
            if (brick.type === BRICK_TYPES.POWERUP || Math.random() < 0.25) {
                const keys = Object.keys(POWERUP_TYPES);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                this.powerupItems.push(new PowerUpItem(brick.x + brick.width / 2 - 15, brick.y, randomKey));
            }
        } else {
            soundEngine.playPaddleHit(0.8);
        }

        this.updateHUD();
    }

    explodeAdjacentBricks(targetBrick) {
        const radius = 90;
        const cx = targetBrick.x + targetBrick.width / 2;
        const cy = targetBrick.y + targetBrick.height / 2;

        for (const brick of this.bricks) {
            if (brick.hp <= 0 || brick === targetBrick) continue;
            const bcx = brick.x + brick.width / 2;
            const bcy = brick.y + brick.height / 2;
            const dist = Math.sqrt((bcx - cx) ** 2 + (bcy - cy) ** 2);

            if (dist <= radius) {
                this.damageBrick(brick);
            }
        }
    }

    handleBossDefeated() {
        soundEngine.playWin();
        this.score += 5000;
        this.triggerScreenShake(15);
        this.updateHUD();
    }

    handleLevelCompleted() {
        soundEngine.playWin();
        if (this.currentLevelIndex + 1 < LEVELS.length) {
            this.currentLevelIndex++;
            this.loadLevel(this.currentLevelIndex);
            this.overlays.showLevelComplete(LEVELS[this.currentLevelIndex].name);
        } else {
            this.gameState = 'WIN';
            this.overlays.showWin(this.score);
        }
    }

    handleGameOver() {
        this.gameState = 'GAME_OVER';
        soundEngine.playLifeLost();
        this.overlays.showGameOver(this.score, this.highScore);
    }

    circleRectOverlap(circle, rect) {
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

        const distanceX = circle.x - closestX;
        const distanceY = circle.y - closestY;

        return (distanceX * distanceX + distanceY * distanceY) < (circle.radius * circle.radius);
    }

    rectOverlap(r1, r1Bounds, r2) {
        return r1Bounds.x < r2.x + r2.width &&
               r1Bounds.x + r1Bounds.width > r2.x &&
               r1Bounds.y < r2.y + r2.height &&
               r1Bounds.y + r1Bounds.height > r2.y;
    }

    updateHUD() {
        this.hud.updateScore(this.score, this.highScore);
        this.hud.updateLives(this.lives);
        this.hud.updateCombo(this.combo);
        this.hud.updateLevel(LEVELS[this.currentLevelIndex].name);
    }

    togglePause() {
        if (this.gameState === 'PLAYING') {
            this.gameState = 'PAUSED';
            this.overlays.showPause();
        } else if (this.gameState === 'PAUSED') {
            this.gameState = 'PLAYING';
            this.overlays.hideAll();
        }
    }

    draw() {
        this.ctx.save();

        // Apply screen shake
        if (this.shakeTimer > 0) {
            const dx = (Math.random() - 0.5) * this.shakeMagnitude;
            const dy = (Math.random() - 0.5) * this.shakeMagnitude;
            this.ctx.translate(dx, dy);
        }

        // Clear Canvas
        this.ctx.fillStyle = '#05070f';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw Background Grid Pattern
        this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }

        // Draw Bottom Energy Shield
        if (this.hasBottomShield) {
            this.ctx.strokeStyle = '#ffe600';
            this.ctx.lineWidth = 4;
            this.ctx.shadowColor = '#ffe600';
            this.ctx.shadowBlur = 15;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.height - 4);
            this.ctx.lineTo(this.width, this.height - 4);
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }

        // Draw Bricks
        for (const brick of this.bricks) {
            if (brick.hp <= 0) continue;

            this.ctx.save();
            this.ctx.fillStyle = brick.color;
            this.ctx.shadowColor = brick.color;
            this.ctx.shadowBlur = brick.type === BRICK_TYPES.UNBREAKABLE ? 4 : 8;

            // Draw brick rounded rect
            this.ctx.beginPath();
            this.ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
            this.ctx.fill();

            // Inner shine / crack details
            if (brick.type === BRICK_TYPES.REINFORCED && brick.hp === 1) {
                this.ctx.strokeStyle = 'rgba(0,0,0,0.6)';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(brick.x + 5, brick.y + 5);
                this.ctx.lineTo(brick.x + brick.width - 5, brick.y + brick.height - 5);
                this.ctx.stroke();
            } else if (brick.type === BRICK_TYPES.UNBREAKABLE) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(brick.x + 3, brick.y + 3, brick.width - 6, brick.height - 6);
            } else if (brick.type === BRICK_TYPES.EXPLOSIVE) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 12px sans-serif';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('💣', brick.x + brick.width / 2, brick.y + brick.height / 2 + 4);
            }

            this.ctx.restore();
        }

        // Draw Boss
        if (this.boss && this.boss.hp > 0) {
            this.ctx.save();
            this.ctx.fillStyle = this.boss.color;
            this.ctx.shadowColor = '#ff0055';
            this.ctx.shadowBlur = 20;

            this.ctx.beginPath();
            this.ctx.roundRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height, 8);
            this.ctx.fill();

            // Boss Health Bar
            const hpRatio = this.boss.hp / this.boss.maxHp;
            this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
            this.ctx.fillRect(this.boss.x, this.boss.y - 12, this.boss.width, 6);
            this.ctx.fillStyle = '#00ff66';
            this.ctx.fillRect(this.boss.x, this.boss.y - 12, this.boss.width * hpRatio, 6);

            this.ctx.restore();
        }

        // Draw Paddle
        this.ctx.save();
        this.ctx.fillStyle = this.paddle.lasersActive ? '#ff0055' : this.paddle.color;
        this.ctx.shadowColor = this.ctx.fillStyle;
        this.ctx.shadowBlur = 12;
        this.ctx.beginPath();
        this.ctx.roundRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height, 8);
        this.ctx.fill();

        // Draw Laser guns on paddle
        if (this.paddle.lasersActive) {
            this.ctx.fillStyle = '#ffe600';
            this.ctx.fillRect(this.paddle.x + 4, this.paddle.y - 6, 6, 6);
            this.ctx.fillRect(this.paddle.x + this.paddle.width - 10, this.paddle.y - 6, 6, 6);
        }
        this.ctx.restore();

        // Draw Lasers
        this.ctx.save();
        this.ctx.fillStyle = '#ff0055';
        this.ctx.shadowColor = '#ff0055';
        this.ctx.shadowBlur = 8;
        for (const laser of this.lasers) {
            this.ctx.fillRect(laser.x - 2, laser.y, 4, 12);
        }
        this.ctx.restore();

        // Draw Powerup Drops
        for (const item of this.powerupItems) {
            item.draw(this.ctx);
        }

        // Draw Balls
        this.ctx.save();
        for (const ball of this.balls) {
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = ball.isFireball ? '#ff3300' : '#00f0ff';
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.shadowBlur = 15;
            this.ctx.fill();
        }
        this.ctx.restore();

        // Draw Particles
        this.particles.draw(this.ctx);

        this.ctx.restore();
    }
}
