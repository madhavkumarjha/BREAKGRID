/* Power-ups System */

export const POWERUP_TYPES = {
    MULTIBALL: { id: 'MULTIBALL', name: 'Multi-Ball', color: '#00f0ff', icon: '⚽' },
    LASER: { id: 'LASER', name: 'Laser Cannon', color: '#ff0055', icon: '🔫', duration: 10000 },
    ENLARGE: { id: 'ENLARGE', name: 'Expand Paddle', color: '#00ff66', icon: '↔️', duration: 12000 },
    FIREBALL: { id: 'FIREBALL', name: 'Fireball', color: '#ff3300', icon: '🔥', duration: 8000 },
    MAGNET: { id: 'MAGNET', name: 'Magnetic Stick', color: '#b026ff', icon: '🧲', duration: 10000 },
    SHIELD: { id: 'SHIELD', name: 'Energy Shield', color: '#ffe600', icon: '🛡️' },
    SLOW: { id: 'SLOW', name: 'Slow-Motion', color: '#00ffff', icon: '⏳', duration: 8000 }
};

export class PowerUpItem {
    constructor(x, y, typeKey) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.type = POWERUP_TYPES[typeKey] || POWERUP_TYPES.MULTIBALL;
        this.vy = 2 + Math.random() * 0.5;
        this.alpha = 1;
        this.rotation = 0;
    }

    update() {
        this.y += this.vy;
        this.rotation += 0.03;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.strokeStyle = this.type.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = this.type.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.stroke();

        ctx.rotate(-this.rotation);
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.type.icon, 0, 1);

        ctx.restore();
    }
}
