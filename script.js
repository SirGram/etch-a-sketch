let numberCells = 20;
let blackMode = true;
let paintStrength = 0.1;

document.addEventListener("DOMContentLoaded", function () {
  // add dom title, container, buttons

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Etch a Sketch";
  document.body.appendChild(title);

  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");
  document.body.appendChild(mainContainer);

  const footer = document.createElement("footer");
  footer.classList.add("footer");
  const link = document.createElement("a");
  link.href = "https://github.com/SirGram/etch-a-sketch";
  link.textContent = "https://github.com/SirGram/etch-a-sketch";
  footer.appendChild(link);
  document.body.appendChild(footer);

  const container = document.createElement("div");
  container.classList.add("container");
  mainContainer.appendChild(container);

  const buttonControls = document.createElement("div");
  buttonControls.classList.add("controls");
  mainContainer.insertBefore(buttonControls, container);

  const cellRange = document.createElement("input");
  cellRange.classList.add("cell-range");
  cellRange.id = "cellRange";
  cellRange.type = "range";
  cellRange.min = 1;
  cellRange.max = 128;
  cellRange.step = 1;
  cellRange.value = 20;
  cellRangeLabel = document.createElement("label");
  cellRangeLabel.textContent = "Number of cells";
  cellRangeLabel.htmlFor = cellRange;
  buttonControls.appendChild(cellRangeLabel);
  buttonControls.appendChild(cellRange);

  const stepsRange = document.createElement("input");
  stepsRange.classList.add("steps-range");
  stepsRange.id = "stepsRange";
  stepsRange.type = "range";
  stepsRange.min = 0;
  stepsRange.max = 1;
  stepsRange.step = 0.1;
  stepsRange.value = 0.1;
  stepsRangeLabel = document.createElement("label");
  stepsRangeLabel.textContent = "Paint Strength";
  stepsRangeLabel.htmlFor = stepsRange;
  buttonControls.appendChild(stepsRangeLabel);
  buttonControls.appendChild(stepsRange);

  const randomButton = document.createElement("button");
  randomButton.classList.add("button");
  randomButton.innerHTML = "Make Random Pattern";
  randomButton.id = "random-button";
  buttonControls.appendChild(randomButton);

  const eraseButton = document.createElement("button");
  eraseButton.classList.add("button");
  eraseButton.id = "erase-button";
  eraseButton.innerHTML = "Delete All";
  buttonControls.appendChild(eraseButton);

  const pencilButton = document.createElement("button");
  pencilButton.classList.add("button");
  pencilButton.innerHTML = "Pencil";
  pencilButton.id = "pencil-button";
  buttonControls.appendChild(pencilButton);

  function getCells() {
    cells = document.querySelectorAll(".cell");
    return cells;
  }

  //change number cells
  cellRange.addEventListener("input", () => {
    numberCells = cellRange.value;
    console.log(numberCells);
    createGrid();
  });
  //change paint strength
  stepsRange.addEventListener("input", () => {
    paintStrength = stepsRange.value;
  });
  // button random pattern
  randomButton.addEventListener("click", () => {
    let randomAlpha;
    cells = getCells();
    cells.forEach((cell) => {
      randomAlpha = Math.round(Math.random() * 10) / 10;
      cell.dataset.alpha = randomAlpha;
      cell.style.backgroundColor = `rgb(${255 * randomAlpha},${
        255 * randomAlpha
      },${255 * randomAlpha})`;
      if (parseFloat(cell.dataset.alpha) <= 0.1) {
        cell.style.boxShadow = "none";
      }
    });
  });

  //erase delete all
  eraseButton.addEventListener("click", () => {
    cells = getCells();
    cells.forEach((cell) => {
      cell.style.backgroundColor = `rgb(255,255,255)`;
      cell.style.boxShadow = "";
      cell.dataset.alpha = 1;
    });
  });
  //pencil-eraser
  pencilButton.addEventListener("click", () => {
    if (blackMode) {
      pencilButton.style.backgroundColor = "pink";
      pencilButton.style.color = "black";
      pencilButton.textContent = "Eraser";
      blackMode = false;
    } else {
      pencilButton.style.backgroundColor = "black";
      pencilButton.textContent = "Pencil";
      pencilButton.style.color = "white";
      blackMode = true;
    }
  });

  createGrid();

  function createGrid() {
    container.innerHTML = "";
    for (let i = 0; i < numberCells; i++) {
      for (let j = 0; j < numberCells; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${i + 1} ${j + 1}`;
        container.appendChild(cell);
        cell.style.flex = `calc(100% / ${numberCells})`;
        cell.style.paddingBottom = `calc(100% / ${numberCells})`;
        cell.dataset.alpha = 1;
      }
    }

    // hovering over div
    const cells = getCells();

    let isMouseDown = false;
    cells.forEach((cell) => {
      function paintCell() {
        console.log();
        console.log("entered");
        let newAlpha;

        if (blackMode) {
          newAlpha = Math.min(
            1,
            parseFloat(cell.dataset.alpha) - paintStrength
          );
          console.log(cell.dataset.alpha);
          cell.style.backgroundColor = `rgb(${255 * newAlpha},${
            255 * newAlpha
          },${255 * newAlpha})`;
        } else {
          newAlpha = Math.max(
            0,
            parseFloat(cell.dataset.alpha) + paintStrength
          );
          console.log(cell.dataset.alpha);
          cell.style.backgroundColor = `rgb(${255 * newAlpha},${
            255 * newAlpha
          },${255 * newAlpha})`;
        }

        console.log(cell.style.backgroundColor);
        cell.dataset.alpha = newAlpha.toFixed(1);

        //removes inner border
        if (parseFloat(cell.dataset.alpha) <= 0.1) {
          cell.style.boxShadow = "none";
        }
      }
      cell.addEventListener("mousedown", () => {
        isMouseDown = true;
        paintCell();
      });
      cell.addEventListener("mouseenter", () => {
        if (isMouseDown) {
          paintCell();
        }
      });
      cell.addEventListener("mouseup", () => {
        isMouseDown = false;
      });
    });
  }
});
