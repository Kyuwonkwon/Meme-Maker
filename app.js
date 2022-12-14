const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let windowWidth;
let windowHeight;
const palette = document.querySelectorAll(".color-option");

function canvasSize() {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;

  if (windowWidth <= windowHeight) {
    canvas.width = windowWidth * 0.6;
    palette.width = windowWidth * 0.05;
    palette.height = windowWidth * 0.05;
    canvas.height = canvas.width;
  } else if (windowWidth > windowHeight) {
    canvas.height = windowHeight * 0.6;
    palette.width = windowHeight * 0.05;
    palette.height = windowHeight * 0.05;
    canvas.width = canvas.height;
  }
}

canvasSize();
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEGHIT = canvas.height;
ctx.lineWidth = lineWidth.value;
ctx.color = color.value;
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown() {
  isPainting = true;
}
function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function colorChange(colorValue) {
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onColorChange(event) {
  colorChange(event.target.value);
}

function onColorClick(event) {
  colorChange(event.target.dataset.color);
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGHIT);
  }
}

function onDestroyClick() {
  const temp = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGHIT);
  ctx.fillStyle = temp;
}

canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);

window.addEventListener("resize", canvasSize);
