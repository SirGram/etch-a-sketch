let numberCells = 16;

document.addEventListener("DOMContentLoaded", function () {
  // add container
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  // button number cells
  const cellButton = document.createElement("button");
  cellButton.classList.add("button");
  cellButton.innerHTML = "Change Number of Cells";
  document.body.insertBefore(cellButton, container);
  cellButton.addEventListener("click", () => {
    numberCells = parseInt(window.prompt("How many cells do you want per side?"), 10);
    console.log(numberCells);
    createGrid();
  });

  //random pattern
  

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
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", () => {
        console.log("entered");
        let newAlpha = Math.min(1, parseFloat(cell.dataset.alpha) - 0.1);
  
        console.log(cell.dataset.alpha);
        cell.style.backgroundColor = `rgb(${255 * newAlpha},${255 * newAlpha},${255 * newAlpha})`;
        console.log(cell.style.backgroundColor);
        cell.dataset.alpha = newAlpha.toFixed(1);        
        //removes inner border
        if(parseFloat(cell.dataset.alpha) <= 0.1){cell.style.boxShadow="none"}
      });
      // no need for mouseout
    });
  }
  
  createGrid();
  
});

