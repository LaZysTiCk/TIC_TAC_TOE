let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for Player (O), false for Computer (X)
let count = 0; // To track Draw

// Array of image URLs for Player and Computer
const playerImgs = [
    "https://i.pinimg.com/564x/c5/01/1d/c5011d35ab436c949223466f909c3912.jpg",
    "https://i.pinimg.com/564x/2c/09/24/2c0924cdf17458a50257e204cfea3954.jpg",
    "https://i.pinimg.com/564x/5d/4c/68/5d4c689a0623013ff8a882519d67d68b.jpg",
    "https://i.pinimg.com/564x/c7/9c/96/c79c961b0161b42f1204f7662a81b07d.jpg",
    "https://i.pinimg.com/564x/ff/e8/ea/ffe8ea2c8479be41a69e4ee54d1e5630.jpg",
    "https://i.pinimg.com/564x/da/13/6a/da136a3c0c77d5a1ff6aa2f431956376.jpg",
    "https://i.pinimg.com/564x/9e/74/43/9e74435311ae20259d2cb9648efc5aaa.jpg",
    "https://i.pinimg.com/564x/fe/34/c4/fe34c45bff3499137c5f549d8611b0be.jpg",
    "https://i.pinimg.com/564x/c8/74/ab/c874ab429779b679cc2cc97ce655808c.jpg",
    "https://i.pinimg.com/564x/e1/30/6a/e1306a916009eb9a35dbcfc466466773.jpg",
    "https://i.pinimg.com/564x/91/a0/f0/91a0f01e6f504efd7dd63013df662e42.jpg",
    "https://i.pinimg.com/564x/16/c7/8a/16c78af846570bf782b7be4ae047faf5.jpg",
    "https://i.pinimg.com/736x/f5/ca/fb/f5cafbf84566f0f9e6915a04345fd12d.jpg",
    "https://i.pinimg.com/564x/0f/32/9c/0f329cc281babefed06a3357b9391fbc.jpg",
    "https://i.pinimg.com/564x/0c/3d/c2/0c3dc23350130ca0ca01fc5401445151.jpg",
    "https://i.pinimg.com/564x/ac/7d/a8/ac7da8e5415951038571caf0ba896426.jpg",
    "https://i.pinimg.com/564x/d3/91/b3/d391b38a7032668c3b2dd23cfc50b8a9.jpg",
    "https://i.pinimg.com/564x/6b/3e/e4/6b3ee49463b85ed83e35667367683a37.jpg",
    "https://i.pinimg.com/564x/45/dd/ed/45dded2693f911137dff5e4497dfc36f.jpg"
];

const computerImgs = [
    "https://i.pinimg.com/564x/c5/01/1d/c5011d35ab436c949223466f909c3912.jpg",
    "https://i.pinimg.com/564x/2c/09/24/2c0924cdf17458a50257e204cfea3954.jpg",
    "https://i.pinimg.com/564x/5d/4c/68/5d4c689a0623013ff8a882519d67d68b.jpg",
    "https://i.pinimg.com/564x/c7/9c/96/c79c961b0161b42f1204f7662a81b07d.jpg",
    "https://i.pinimg.com/564x/ff/e8/ea/ffe8ea2c8479be41a69e4ee54d1e5630.jpg",
    "https://i.pinimg.com/564x/da/13/6a/da136a3c0c77d5a1ff6aa2f431956376.jpg",
    "https://i.pinimg.com/564x/9e/74/43/9e74435311ae20259d2cb9648efc5aaa.jpg",
    "https://i.pinimg.com/564x/fe/34/c4/fe34c45bff3499137c5f549d8611b0be.jpg",
    "https://i.pinimg.com/564x/c8/74/ab/c874ab429779b679cc2cc97ce655808c.jpg",
    "https://i.pinimg.com/564x/e1/30/6a/e1306a916009eb9a35dbcfc466466773.jpg",
    "https://i.pinimg.com/564x/91/a0/f0/91a0f01e6f504efd7dd63013df662e42.jpg",
    "https://i.pinimg.com/564x/16/c7/8a/16c78af846570bf782b7be4ae047faf5.jpg",
    "https://i.pinimg.com/736x/f5/ca/fb/f5cafbf84566f0f9e6915a04345fd12d.jpg",
    "https://i.pinimg.com/564x/0f/32/9c/0f329cc281babefed06a3357b9391fbc.jpg",
    "https://i.pinimg.com/564x/0c/3d/c2/0c3dc23350130ca0ca01fc5401445151.jpg",
    "https://i.pinimg.com/564x/ac/7d/a8/ac7da8e5415951038571caf0ba896426.jpg",
    "https://i.pinimg.com/564x/d3/91/b3/d391b38a7032668c3b2dd23cfc50b8a9.jpg",
    "https://i.pinimg.com/564x/6b/3e/e4/6b3ee49463b85ed83e35667367683a37.jpg",
    "https://i.pinimg.com/564x/45/dd/ed/45dded2693f911137dff5e4497dfc36f.jpg"
];

// Randomly select one image for Player and one for Computer
let currentPlayerImg = "";
let currentComputerImg = "";

const getRandomImage = (imagesArray) => {
    return imagesArray[Math.floor(Math.random() * imagesArray.length)];
};

const startNewGame = () => {
    currentPlayerImg = getRandomImage(playerImgs);
    currentComputerImg = getRandomImage(computerImgs);
    resetGame();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const computerMove = () => {
    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerHTML === "") {
            availableBoxes.push(index);
        }
    });

    if (availableBoxes.length > 0) {
        let randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        boxes[randomIndex].innerHTML = `<img src="${currentComputerImg}" alt="Computer">`;
        boxes[randomIndex].disabled = true;
        count++;
        if (checkWinner()) {
            showWinner("Computer");
        } else if (count === 9) {
            gameDraw();
        }
    }
};

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boxes[a].innerHTML !== "" && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            return true;
        }
    }
    return false;
};

const showWinner = (winner) => {
    msg.innerText = `${winner} Wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerHTML = "";
        box.addEventListener("click", playerMove, { once: true });
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const playerMove = (e) => {
    const box = e.target;
    if (turnO && box.innerHTML === "") {
        box.innerHTML = `<img src="${currentPlayerImg}" alt="Player">`;
        box.disabled = true;
        count++;
        if (checkWinner()) {
            showWinner("Player");
        } else if (count < 9) {
            turnO = false;
            computerMove();
            turnO = true;
        } else {
            gameDraw();
        }
    }
};

resetBtn.addEventListener("click", startNewGame);
newGameBtn.addEventListener("click", startNewGame);

// Start the first game
startNewGame();

