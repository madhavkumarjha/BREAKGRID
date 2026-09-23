/* Particle & FX System for Breakout */
export class ParticleEngine {
    constructor() {
        this.particles = [];
        this.shockwaves = [];
        this.floatingTexts = [];
    }

    createBrickExplosion(x, y, width, height, color) {
        const particleCount = 14;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 4;
            this.particles.push({
                x: x + width / 2 + (Math.random() - 0.5) * width * 0.8,
                y: y + height / 2 + (Math.random() - 0.5) * height * 0.8,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 4,
                color: color,
                alpha: 1,
                decay: 0.02 + Math.random() * 0.03,
                gravity: 0.08
            });
        }

        this.shockwaves.push({
            x: x + width / 2,
            y: y + height / 2,
            radius: 5,
            maxRadius: 30,
            color: color,
            alpha: 0.8,
            lineWidth: 3
        });
    }

    createExplosiveBlast(x, y) {
        const particleCount = 35;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 7;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 6,
                color: Math.random() > 0.5 ? '#ff0055' : '#ffe600',
                alpha: 1,
                decay: 0.015 + Math.random() * 0.02,
                gravity: 0.05
            });
        }

        this.shockwaves.push({
            x: x,
            y: y,
            radius: 10,
            maxRadius: 75,
            color: '#ff0055',
            alpha: 1,
            lineWidth: 5
        });
    }

    createBallTrail(x, y, color, isFireball = false) {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: isFireball ? 6 : 4,
            color: isFireball ? '#ff3300' : color,
            alpha: 0.6,
            decay: isFireball ? 0.05 : 0.08,
            gravity: 0
        });
    }

    addFloatingText(text, x, y, color = '#ffe600') {
        this.floatingTexts.push({
            text: text,
            x: x,
            y: y,
            vy: -1.5,
            color: color,
            alpha: 1,
            decay: 0.02
        });
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }

        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const s = this.shockwaves[i];
            s.radius += 3;
            s.alpha -= 0.04;
            if (s.alpha <= 0 || s.radius >= s.maxRadius) {
                this.shockwaves.splice(i, 1);
            }
        }

        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy;
            ft.alpha -= ft.decay;
            if (ft.alpha <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        ctx.save();
        for (const s of this.shockwaves) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.strokeStyle = s.color;
            ctx.globalAlpha = Math.max(0, s.alpha);
            ctx.lineWidth = s.lineWidth;
            ctx.stroke();
        }
        ctx.restore();

        ctx.save();
        for (const p of this.particles) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        ctx.save();
        ctx.font = 'bold 16px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        for (const ft of this.floatingTexts) {
            ctx.fillStyle = ft.color;
            ctx.globalAlpha = Math.max(0, ft.alpha);
            ctx.fillText(ft.text, ft.x, ft.y);
        }
        ctx.restore();
    }

    clear() {
        this.particles = [];
        this.shockwaves = [];
        this.floatingTexts = [];
    }
}
