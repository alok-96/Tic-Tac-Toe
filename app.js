const winnigCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cell = document.querySelectorAll(".cell");
const container = document.querySelector(".container");
const messageText = document.querySelector(".message-text");
const messageBody = document.querySelector(".message");
const restartBtn = document.querySelector("#btn");
let circleTurn = false;


//Putting symbol on the cell
const placeSymbol = function (currCell, currClass) {
  currCell.classList.add(currClass);
};

// Switching the turn
const switchTurn = function () {
  circleTurn = !circleTurn;
};

// Set-Reset the hover effect
const setCellHover = function () {
  if (circleTurn) {
    container.classList.remove("cross");
    container.classList.add("circle");
  } else {
    container.classList.remove("circle");
    container.classList.add("cross");
  }
};

//Check for Winner
const checkWinner = function (currClass) {
  return winnigCombinations.some((combinations) => {
    return combinations.every((index) => {
      return cell[index].classList.contains(currClass);
    });
  });
};

// Ending the game
const endGame = function (flag) {
  if (flag) {
    messageText.innerHTML = "Draw!";
    console.log("alok");
  } else {
    messageText.innerHTML = `${circleTurn ? "O" : "X"} Wins!`;
  }
  messageBody.classList.remove("hidden");
};

//Check For Draw
const isDraw = function () {
  return [...cell].every((element) => {
    return (
      element.classList.contains("cross") ||
      element.classList.contains("circle")
    );
  });
};

// Handling click event on a cell
const handleClick = function (e) {
  const currCell = e.target;
  const currClass = circleTurn ? "circle" : "cross";
  placeSymbol(currCell, currClass);

  //Check for Winner
  if (checkWinner(currClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
    setCellHover();
  }
};

// Starting the Game and Traversing each cell
const startGame = function () {
  circleTurn = false;
  messageBody.classList.add('hidden');
  
  
  cell.forEach((e) => {
    e.classList.remove("cross");
    e.classList.remove("circle");
    e.addEventListener("click", handleClick, { once: true });
  });
};

startGame();

// Restart Button
restartBtn.addEventListener("click", startGame);
