class Game {
  fields;
  activePlayer;
  gameActive;

  currentMode = null;
  doesAIMoveFirst = false;

  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  constructor() {
    this.board = new Board(
      this.handleItemClick,
      this.handleReset,
      this.handleModeChange
    );
    this.setDefaults();
  }
  validateGame = () => {
    let gameWin = false;
    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = this.winningConditions[i];
      const value1 = this.fields[posA];
      const value2 = this.fields[posB];
      const value3 = this.fields[posC];

      if (value1 !== "" && value1 === value2 && value1 === value3) {
        gameWin = true;
        break;
      }
    }
    if (gameWin) {
      this.gameActive = false;
      this.board.displayWinMessage(this.activePlayer);
    } else if (this.isBoardFull()) {
      this.gameActive = false;
      this.board.displayTieMessage();
    }
  };
  isBoardFull = () => {
    return this.fields.find((field) => field === "") === undefined;
  };
  handleModeChange = (e) => {
    this.currentMode = this.getModeClassForName(e.target.value);
    this.setDefaults(false);
    this.board.resetBoard();
  };
  getModeClassForName = (name) => {
    if (name === "easy") return new EasyMode();
    if (name === "medium") return new MediumMode();
    return null;
  };
  handleReset = () => {
    this.setDefaults(!this.doesAIMoveFirst);
    this.AIsFirstMove();
  };
  AIsFirstMove = () => {
    if (this.doesAIMoveFirst && this.currentMode !== null) {
      this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
    }
  };

  handleItemClick = (e) => {
    const { pos } = e.target.dataset;

    if (this.gameActive && this.fields[pos] === "") {
      this.makeMove(pos);

      if (this.gameActive && this.currentMode !== null) {
        this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
      }
    }
  };

  makeMove = (position) => {
    this.fields[position] = this.activePlayer;
    this.board
      .getFieldForPositoin(position)
      .classList.add(`board__item--filled-${this.activePlayer}`);
    this.validateGame();

    this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    this.board.setCuttentPlayer(this.activePlayer);
  };
  setDefaults = (isAIsMove) => {
    this.fields = ["", "", "", "", "", "", "", "", ""];
    this.activePlayer = "X";
    this.gameActive = true;
    this.doesAIMoveFirst = isAIsMove !== undefined ? isAIsMove : false;
  };
}

class Board {
  fieldsElements = document.querySelectorAll(".board__item");
  panel = document.querySelector(".panel");
  button = document.querySelector(".restart-button");
  modeSelect = document.querySelector("#mode-select");
  currentPlayer = document.querySelector("#current-player");

  constructor(onItemClick, onButtonClick, onModeChange) {
    this.onButtonClick = onButtonClick;

    this.button.addEventListener("click", this.handleButtonClick);
    this.fieldsElements.forEach((field) => {
      field.addEventListener("click", onItemClick);
    });
    this.modeSelect.addEventListener("change", onModeChange);
    this.setCuttentPlayer("X");
  }
  setCuttentPlayer = (player) => {
    this.currentPlayer.innerText = player;
  };
  handleButtonClick = () => {
    this.resetBoard();
    this.onButtonClick();
  };
  resetBoard = () => {
    this.resetBoardClasses();
    this.clearMessage();
    this.setCuttentPlayer("X");
  };
  resetBoardClasses = () => {
    this.fieldsElements.forEach((field) => {
      field.classList.remove("board__item--filled-X", "board__item--filled-O");
    });
  };

  getFieldForPositoin = (position) => {
    return this.fieldsElements[position];
  };
  displayWinMessage = (activePlayer) => {
    this.panel.innerText = `Gratulacje ${activePlayer}, Wygrałeś!`;
  };

  displayTieMessage = () => {
    this.panel.innerText = "Remis!";
  };

  clearMessage = () => {
    this.panel.innerText = "";
  };
}

const game = new Game();

class EasyMode {
  getMove = (fields, player) => {
    const emptyIndexes = Object.entries(fields)
      .filter((fieldsEntry) => fieldsEntry[1] === "")
      .map((fieldsEntry) => fieldsEntry[0]);
    const randomPositionIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomPositionIndex];
  };
}
winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
class MediumMode {
  getMove = (fields, player) => {
    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = winningConditions[i];
      const value1 = fields[posA];
      const value2 = fields[posB];
      const value3 = fields[posC];

      if (value1 === value2 && value1 !== "" && value3 === "") {
        return posC;
      }
      if (value1 === value3 && value1 !== "" && value2 === "") {
        return posB;
      }
      if (value2 === value3 && value2 !== "" && value1 === "") {
        return posA;
      }
    }

    const emptyIndexes = Object.entries(fields)
      .filter((fieldsEntry) => fieldsEntry[1] === "")
      .map((fieldsEntry) => fieldsEntry[0]);
    const randomPositionIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomPositionIndex];
  };
}
