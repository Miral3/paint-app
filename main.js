const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // 하얀색 배경으로 초기화
ctx.strokeStyle = INITIAL_COLOR; // 그릴 선들의 색상
ctx.fillStyle = INITIAL_COLOR; // 채울 색상
ctx.lineWidth = 2.5; // 그릴 선들의 너비

let painting = false; // 그리기 모드
let filling = false; // 채우기 모드

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (!filling) {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) { // 그리지 않는 상태 (= 마우스를 클릭 하지 않거나 canva에서 벗어났을 때)
    ctx.beginPath(); // path(=선)을 시작
    ctx.moveTo(x, y); // path을 만들면 마우스의 x,y좌표로 path를 옮김
  } else { // 그리는 상태 (= 마우스가 클릭 했을 때)
    ctx.lineTo(x, y); //path의 이전 위치에서 지금 위치까지의 선을 만듬
    ctx.stroke(); // 만들어진 path에 획을 그음
  }
}

/* 색깔 지정 */
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

/* 너비 지정 */
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

/* 모드 변경 */
function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";

  }
}

/* filling모드일 때 캔버스 클릭 시 채우기 */
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

/* 우클릭 방지 */
function handleCM(event) {
  event.preventDefault();
}

/* 저장 버튼 클릭시 다운로드 */
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image
  link.download = "PaintJS[🎨]";
  link.click();
}
if (canvas) {
  /* 마우스를 움직이고, 클릭하고, 때고, 벗어날 때 */
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}