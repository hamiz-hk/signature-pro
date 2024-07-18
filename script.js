// const canvas = document.getElementById('signatureCanvas');
// const ctx = canvas.getContext('2d');
// let drawing = false;

// canvas.addEventListener('mousedown', startDrawing);
// canvas.addEventListener('mouseup', stopDrawing);
// canvas.addEventListener('mousemove', draw);

// document.getElementById('clearButton').addEventListener('click', clearCanvas);
// document.getElementById('downloadButton').addEventListener('click', downloadCanvas);

// function startDrawing(event) {
//     drawing = true;
//     ctx.beginPath();
//     ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
// }

// function stopDrawing() {
//     drawing = false;
//     ctx.closePath();
// }

// function draw(event) {
//     if (!drawing) return;
//     ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
//     ctx.stroke();
// }

// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function downloadCanvas() {
//     const link = document.createElement('a');
//     link.download = 'signature.png';
//     link.href = canvas.toDataURL('image/png');
//     link.click();
// }
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDrawingTouch, { passive: true });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', drawTouch, { passive: true });

document.getElementById('clearButton').addEventListener('click', clearCanvas);
document.getElementById('downloadButton').addEventListener('click', downloadCanvas);

function getMousePos(event) {
    return {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop
    };
}

function getTouchPos(event) {
    const touch = event.touches[0];
    return {
        x: touch.clientX - canvas.offsetLeft,
        y: touch.clientY - canvas.offsetTop
    };
}

function startDrawing(event) {
    drawing = true;
    const pos = getMousePos(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function startDrawingTouch(event) {
    drawing = true;
    const pos = getTouchPos(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(event) {
    if (!drawing) return;
    const pos = getMousePos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function drawTouch(event) {
    if (!drawing) return;
    const pos = getTouchPos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
