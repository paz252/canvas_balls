let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 60;
// let minRadius = 2;

addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

addEventListener('touchmove',(e)=>{
    mouse.x = e.screenX;
    mouse.y = e.screenY;
})

addEventListener('touchstart',(e)=>{
    mouse.x = e.screenX;
    mouse.y = e.screenY;
})

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = 'blue';
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init(){
    circleArray = [];

    for (let i = 0; i < Math.floor(canvas.width / 3); i++) {
        let radius = Math.random() * (10 - 5) + 5;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        let color = `hsl(${Math.random() * 360},50%,50%)`
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.3)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    circleArray.forEach(circle => {
        circle.update();
    })
}

init();
animate();
