const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const particleCount = 800; // Number of dots
const baseSpeed = 0.5;

// Resize handling
function resize() {
    // UPDATED: Get the dimensions of the parent container (#head)
    // instead of the entire window.
    const container = canvas.parentElement;

    if (container) {
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;
    } else {
        // Fallback if parent isn't found
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
}

// Listen for window resize to adjust the canvas if the browser zooms or changes size
window.addEventListener('resize', resize);
// Initial call to set size immediately
resize();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * baseSpeed;
        this.vy = (Math.random() - 0.5) * baseSpeed;
        this.size = Math.random() * 2 + 0.5; // Dot size

        // Grey variations
        const shade = Math.floor(Math.random() * 155) + 100; // 100-255 range
        this.color = `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.5 + 0.2})`;

        // For flow field effect
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        // Create a "Flow Field" effect using noise-like calculation
        const noiseScale = 0.002;
        const angle = (Math.cos(this.x * noiseScale) + Math.sin(this.y * noiseScale)) * Math.PI;

        this.vx += Math.cos(angle) * 0.05;
        this.vy += Math.sin(angle) * 0.05;

        // Friction to stop them from speeding up infinitely
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around logic (Modified to use current width/height of header)
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize particles
function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation Loop
function animate() {
    // Clear the specific canvas area (width/height variables update on resize)
    // Using a semi-transparent fill creates the trail effect
    ctx.fillStyle = 'rgba(18, 18, 18, 0.2)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// Start everything
init();
animate();