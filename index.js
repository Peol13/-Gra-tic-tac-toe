window.onload = function () {
  app.init();
};

let easyMode = true;
class App {
  winningVariants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  currentPlayer = "O";

  init() {
    pvp.addEventListener("click", () => this.changePvp());
    easy.addEventListener("click", () => this.changeEasy());
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.addEventListener("click", this.cellClick));
    document
      .getElementById("restart-game")
      .addEventListener("click", () => this.restartGame());
    if (easyMode == true) {
      this.AITurn();
    }
  }

  cellClick = (e) => {
    this.playerTurn(e.target);
  };

  innitGame() {
    this.currentPlayer = "X";

    document.querySelectorAll(".cell").forEach((el) => {
      el.innerHTML = "";
    });
  }
  playerTurn(el) {
    if (el.innerHTML == "X" || el.innerHTML == "O") return;
    el.innerHTML = this.currentPlayer;
    this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";
    this.checkWinner();

    if (this.currentPlayer == "O" && easyMode == true) {
      this.AITurn();
      this.checkWinner();
    }
  }

  AITurn() {
    this.checkWinner();
    let SetNr = Math.floor(Math.random() * 9);
    let AddInCellSetNr = document.querySelector(
      `[data-index="${SetNr}"]`
    ).innerHTML;

    //console.log(document.querySelector(`[data-index="${SetNr}"]`)) - Index pola wylosowanego przez AI

    if (AddInCellSetNr == "") {
      document.querySelector(`[data-index="${SetNr}"]`).innerHTML = "O";
      this.currentPlayer = "X";
    }

    if (AddInCellSetNr !== "") {
      this.AITurn();
    }
  }
  cell1 = document.querySelector(`[data-index="0"]`);
  cell2 = document.querySelector(`[data-index="1"]`);
  cell3 = document.querySelector(`[data-index="2"]`);
  cell4 = document.querySelector(`[data-index="3"]`);
  cell5 = document.querySelector(`[data-index="4"]`);
  cell6 = document.querySelector(`[data-index="5"]`);
  cell7 = document.querySelector(`[data-index="6"]`);
  cell8 = document.querySelector(`[data-index="7"]`);
  cell9 = document.querySelector(`[data-index="8"]`);

  checkWinner() {
    for (let i = 0; i < this.winningVariants.length; i++) {
      const variant = this.winningVariants[i];
      const a = this.getCellValue(variant[0]);
      const b = this.getCellValue(variant[1]);
      const c = this.getCellValue(variant[2]);

      if (a == "" || b == "" || c == "") continue;

      if (
        this.cell1.innerHTML !== "" &&
        this.cell2.innerHTML !== "" &&
        this.cell3.innerHTML !== "" &&
        this.cell4.innerHTML !== "" &&
        this.cell5.innerHTML !== "" &&
        this.cell6.innerHTML !== "" &&
        this.cell7.innerHTML !== "" &&
        this.cell8.innerHTML !== "" &&
        this.cell9.innerHTML !== "" &&
        a !== b &&
        b !== c
      ) {
        this.setWinner(" - Remis");
      }
      if (a == b && b == c) {
        this.setWinner(" - zwyciężył: " + a);
      }
    }
  }

  restartGame() {
    this.innitGame();
    this.init();
    this.setWinner("");
  }
  changePvp() {
    easyMode = false;
    this.innitGame();
    this.init();
  }
  changeEasy() {
    easyMode = true;
    this.innitGame();
    this.init();
  }
  setWinner(str) {
    document.getElementById("winner").innerHTML = str;
  }
  getCellValue(index) {
    return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
  }
}
const app = new App();
let pvp = document.querySelector(".pvp");
let easy = document.querySelector(".easy");
