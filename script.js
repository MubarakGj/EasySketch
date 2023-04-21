let ismouseDown = false;
let isEraserOn = false;

//sets grid size value in the css
function setGridSizeValue() {
    const gridSize = document.querySelector("#gridSize").value;
    const gridSizeValue = document.querySelector("#value");
    gridSizeValue.textContent = "Value: " + gridSize + " x " + gridSize;
    const root = document.querySelector(":root");
    root.style.setProperty("--grid-size", gridSize);
}

//Loads grid when the page load is completed
window.addEventListener('DOMContentLoaded', (e) => {
    setGridSizeValue();
    loadGrid();
});

const gridContainer = document.querySelector("#gridContainer");
gridContainer.addEventListener('mousedown', () => { ismouseDown = true });
gridContainer.addEventListener('mouseup', () => { ismouseDown = false });
// gridContainer.addEventListener('mouseout', () => { ismouseDown = false });

//Detecting eraser status
const eraser = document.querySelector("#eraser");
eraser.addEventListener('click', (e) => { isEraserOn = true });

//Detecting eraser status
const draw = document.querySelector("#draw");
draw.addEventListener('click', (e) => { isEraserOn = false });

//Clearing board
const clear = document.querySelector("#clear");
clear.addEventListener('click', clearBoard);

//Change background color
const colorpicker = document.querySelector("#colorPicker");
colorpicker.addEventListener('input', setFillercolor);

//sets grid size based on the user input
let gridSize = document.querySelector("#gridSize");
gridSize.addEventListener('input', (e) => {
    setGridSizeValue();
    clearGrid();
    loadGrid();
});

//Load grid based on the grid size selected
function loadGrid() {
    const gridSizeValue = document.querySelector("#gridSize").value;
    let gridContainer = document.querySelector("#gridContainer");
    let existingGridCellCount = document.querySelectorAll(".gridCell");
    let gridCellCount = Number(gridSizeValue) * Number(gridSizeValue);
    if (gridCellCount > existingGridCellCount) {
        gridCellCount = gridCellCount - existingGridCellCount;
    }
    for (let j = 1; j <= gridCellCount; j++) {
        let gridCell = document.createElement("div");
        gridCell.classList.add("gridCell");
        gridContainer.appendChild(gridCell);
        gridCell.addEventListener('mouseover', fillColor);
        gridCell.addEventListener('mousedown', fillColorwhenClicked);
    }
}

//clears the existing grid
function clearGrid() {
    let gridContainer = document.querySelector("#gridContainer");
    gridContainer.innerHTML = null;
}

//fills the event targeted grid cell with selected color
function fillColor(e) {
    if (ismouseDown && !isEraserOn) {
        e.target.classList.add("clicked");
    }
    if (ismouseDown && isEraserOn) {
        e.target.classList.remove("clicked");
    }
}
function fillColorwhenClicked(e) {
    if (!isEraserOn) {
        e.target.classList.add("clicked");
    }
    if (isEraserOn) {
        e.target.classList.remove("clicked");
    }
}

//reads color from colorPicker and sets the background color value for grid cells
function setFillercolor() {
    const color = document.querySelector("#colorPicker").value;
    const root = document.querySelector(":root");
    root.style.setProperty("--filler-color", color);
}

function clearBoard() {
    const cells = document.querySelectorAll(".clicked");
    cells.forEach(cell => cell.classList.remove("clicked"));
}