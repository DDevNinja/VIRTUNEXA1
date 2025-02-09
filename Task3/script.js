gsap.from("#title",{
    y:-100,
    duration:0.7
})

const socket = io();
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let drawing = false;
let tool = 'pen';
let color = '#000000';
let lastX = 0, lastY = 0;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
    socket.emit('start', { x: lastX, y: lastY });
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    socket.emit('end');
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = tool === 'eraser' ? 20 : 2;
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
    socket.emit('draw', { x1: lastX, y1: lastY, x2: event.offsetX, y2: event.offsetY, color, tool });
}

function setTool(selectedTool) {
    tool = selectedTool;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    
    // Highlight the active tool button
    document.querySelectorAll('.toolbar button').forEach(btn => {
        btn.style.backgroundColor = '';
    });

    document.querySelector(`button[onclick="setTool('${selectedTool}')"]`).style.backgroundColor = 'lightgray';
}

function setColor(selectedColor) {
    color = selectedColor;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear');
}

socket.on('draw', (data) => {
    ctx.lineWidth = data.tool === 'eraser' ? 20 : 2;
    ctx.strokeStyle = data.tool === 'eraser' ? '#FFFFFF' : data.color;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(data.x1, data.y1);
    ctx.lineTo(data.x2, data.y2);
    ctx.stroke();
});

socket.on('clear', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
