const canvas = document.getElementById('starfall-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -Math.random() * window.innerHeight;
        this.speed = Math.random() * 1.2 + 0.6;
        this.length = Math.random() * 18 + 6;
        this.opacity = Math.random() * 0.35 + 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(125, 211, 252, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
    }

    update() {
        this.y += this.speed;
        if (this.y > window.innerHeight + this.length) {
            this.reset();
        }
        this.draw();
    }
}

function createStars(count = 70) {
    stars = Array.from({ length: count }, () => new Star());
}

function animate() {
    ctx.fillStyle = 'rgba(7, 13, 26, 0.18)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach(star => star.update());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars(70);
});

resizeCanvas();
createStars();
animate();
