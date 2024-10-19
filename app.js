let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let oWinsDisplay = document.getElementById("o-wins");
let xWinsDisplay = document.getElementById("x-wins");
let turnO = true;
let oWins = 0;
let xWins = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
]

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});


const showPopup = (winner) => {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <p>${winner} wins!</p>
      <button>Close</button>
    `;

    document.body.appendChild(popup);
    popup.style.display = "block";
    // Close popup button
    const closeBtn = popup.querySelector("button");
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const position1Val = boxes[pattern[0]].innerHTML;
    const position2Val = boxes[pattern[1]].innerHTML;
    const position3Val = boxes[pattern[2]].innerHTML;

    if (position1Val != "" && position2Val != "" && position3Val != "") {
      if (position1Val === position2Val && position2Val === position3Val) {
        if (position1Val === "O") {
          oWins++;
          showPopup("Player O");
        } else if (position1Val === "X") {
          xWins++;
          showPopup("Player X");
        }


        boxes.forEach((box) => {
          if (!box.disabled) {
            box.disabled = true;
          }
        });
      }
    }
  }
};

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
    });

    turnO = true;
    gameOver = false;
});

