// Class Firework


class Firework {
    constructor(x, y, particleCount) {
        this.x = x;
        this.y = y;
        this.particles = new Array();
        const baseHue = Math.random() * 360;
        const hueVariance = 40;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(x, y, 360 / particleCount * i, baseHue, hueVariance));
        }
    }
}

class Particle {
    constructor(x, y, angle, baseHue, hueVariance) {
        this.x = x;
        this.y = y;
        const speed = Math.random() * 100 + Math.abs((angle + 90) % 360 - 180) / 180 * 30; // 0~130 px/s
        const radians = angle * Math.PI / 180;
        this.speed = [Math.cos(radians) * speed, Math.sin(radians) * speed];
        this.setColor(baseHue, hueVariance);
    }

    // 随机颜色
    setColor(baseHue, hueVariance) {
        this.hue = Math.floor(Math.random() * hueVariance * 2) + (baseHue - hueVariance);
        this.lightness = Math.floor(Math.random() * 21) + 50;
        this.alpha = (Math.floor(Math.random() * 60) + 40) / 100;
    }

    getColor() {
        return "hsla(" + this.hue + ",100%," + this.lightness + "%," + this.alpha + ")";
    }
}
