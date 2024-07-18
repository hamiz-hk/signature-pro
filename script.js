const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastPos = { x: 0, y: 0 };
let hue = 'black';

function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = width / 2; // Maintain a 2:1 aspect ratio
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);
    clearCanvas(); // Clear canvas after resizing to prevent distortion
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDrawingTouch, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', drawTouch, { passive: false });

document.getElementById('clearButton').addEventListener('click', clearCanvas);
document.getElementById('downloadButton').addEventListener('click', downloadCanvas);
document.getElementById('blackButton').addEventListener('click', () => setColor('black'));
document.getElementById('blueButton').addEventListener('click', () => setColor('blue'));

function getMousePos(event) {
    return {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top
    };
}

function getTouchPos(event) {
    const touch = event.touches[0];
    return {
        x: touch.clientX - canvas.getBoundingClientRect().left,
        y: touch.clientY - canvas.getBoundingClientRect().top
    };
}

function setColor(color) {
    hue = color;
}

function startDrawing(event) {
    drawing = true;
    lastPos = getMousePos(event);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
}

function startDrawingTouch(event) {
    event.preventDefault();
    drawing = true;
    lastPos = getTouchPos(event);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
}

function stopDrawing(event) {
    drawing = false;
}

function draw(event) {
    if (!drawing) return;
    const pos = getMousePos(event);
    ctx.strokeStyle = hue;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos = pos;
}

function drawTouch(event) {
    event.preventDefault();
    if (!drawing) return;
    const pos = getTouchPos(event);
    ctx.strokeStyle = hue;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos = pos;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
    // Create a temporary canvas to add a white background
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Fill the temporary canvas with a white background
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the original canvas content on the temporary canvas
    tempCtx.drawImage(canvas, 0, 0);

    // Create a link and set the URL using the data URL of the temporary canvas
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
}
