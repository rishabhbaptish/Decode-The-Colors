const colorOptions = document.querySelectorAll('.color-option');
const innerCircles = document.querySelectorAll('.inner-circle');
const submitButton = document.getElementById("submit");
const movesLeftElement = document.querySelector(".moves-left .number");
const moveList = document.querySelector(".move-list");
const level = document.getElementById("level");
const rulesDiv = document.getElementById("rules");
const hintsDiv = document.getElementById("hints");
const exitButton = document.getElementById("exit");
const skipButton = document.getElementById("skip");
let correctPattern = [];
let availableColors = [];

skipButton.addEventListener("click",()=>{
    nextLevel();
});
exitButton.addEventListener("click",() =>{
    window.location.href = 'main.html';
});
rulesDiv.addEventListener("click", () => {
    window.location.href = 'rules.html';
 });

 hintsDiv.addEventListener("click", () => {
    hint();
 });

if (level.getAttribute("data") == '1')
    availableColors = ["orange", "green", "purple"];
else if (level.getAttribute("data") == '2')
    availableColors = ["red", "blue", "orange", "lightcoral"];
else if (level.getAttribute("data") == '3')
    availableColors = ["violet", "green", "lightcoral", "brown", "purple"];
function generateRandomPattern() {
    if (level.getAttribute("data") == '1')
        correctPattern = [
            availableColors[Math.floor(Math.random() * availableColors.length)],
            availableColors[Math.floor(Math.random() * availableColors.length)],
        ];
    else if (level.getAttribute("data") == '2')
        correctPattern = [
            availableColors[Math.floor(Math.random() * availableColors.length)],
            availableColors[Math.floor(Math.random() * availableColors.length)],
            availableColors[Math.floor(Math.random() * availableColors.length)],
        ];
    else if (level.getAttribute("data") == '3')
    correctPattern = [
        availableColors[Math.floor(Math.random() * availableColors.length)],
        availableColors[Math.floor(Math.random() * availableColors.length)],
        availableColors[Math.floor(Math.random() * availableColors.length)],
        availableColors[Math.floor(Math.random() * availableColors.length)],
    ];
}
generateRandomPattern();
colorOptions.forEach(option => {
    option.addEventListener('dragstart', event => {
        event.dataTransfer.setData('color', option.dataset.color);
    });
});

innerCircles.forEach(circle => {
    circle.addEventListener('dragover', event => {
        event.preventDefault();
    });

    circle.addEventListener('drop', event => {
        const color = event.dataTransfer.getData('color');
        circle.style.backgroundColor = color;
    });
});

submitButton.addEventListener("click", () => {
    let allCirclesColored = true;
    let userPattern = [];
    innerCircles.forEach(circle => {
        if (!circle.style.backgroundColor) {
            allCirclesColored = false;
        } else {
            userPattern.push(circle.style.backgroundColor);
        }
    });

    if (!allCirclesColored) {
        fillAll();
        return;
    }

    let correctColors = 0;
    let correctPositions = 0;
    userPattern.forEach((color, index) => {
        if (correctPattern.includes(color)) {
            correctColors++;
            if (correctPattern[index] === color) {
                correctPositions++;
            }
        }
    });

    if (
        userPattern.length === correctPattern.length &&
        userPattern.every((color, index) => color === correctPattern[index])
    ) {
        success();
    }
    let movesLeft = parseInt(movesLeftElement.textContent);
    if (movesLeft > 0) {
        movesLeft--;
        if(movesLeft == 0 )
                failure();
        movesLeftElement.textContent = movesLeft;

        const newMove = document.createElement("div");
        newMove.classList.add("move");

        const moveNumber = document.createElement("p");
        moveNumber.textContent = `${moveList.children.length + 1}.`;
        moveNumber.style.marginBottom = "-15px";

        const moveContent = document.createElement("div");
        moveContent.classList.add("move-content");

        const colorsContainer = document.createElement("div");
        colorsContainer.classList.add("colors");

        innerCircles.forEach(circle => {
            const colorDiv = document.createElement("div");
            colorDiv.classList.add("color");
            colorDiv.style.backgroundColor = circle.style.backgroundColor;
            colorsContainer.appendChild(colorDiv);
        });

        moveContent.appendChild(colorsContainer);

        const correctColorText = document.createElement("div");
        correctColorText.classList.add("moveText");
        correctColorText.textContent = `Correct colour: ${correctColors}`;

        const correctPositionText = document.createElement("div");
        correctPositionText.classList.add("moveText");
        correctPositionText.textContent = `Correct colour and position: ${correctPositions}`;

        newMove.appendChild(moveNumber);
        newMove.appendChild(moveContent);
        newMove.appendChild(correctColorText);
        newMove.appendChild(correctPositionText);

        moveList.appendChild(newMove);
        moveList.scrollTop = moveList.scrollHeight;
        innerCircles.forEach(circle => {
            circle.style.backgroundColor = "";
        });
    } else {
        failure();
    }
});
function nextLevel(){
    if (level.getAttribute("data") == '1')
        window.location.href = 'level2.html';
    else if (level.getAttribute("data") == '2')
        window.location.href = 'level3.html';
    else if (level.getAttribute("data") == '3')
        maxLevel();
}

function maxLevel() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    const popup = document.createElement("div");
    popup.id = "popup";
    const heading = document.createElement("h2");
    heading.textContent = "Well Done!";
    const message = document.createElement("p");
    message.appendChild(document.createTextNode("Max Level Reached!"));
    message.appendChild(document.createElement("br"));
    message.appendChild(document.createTextNode("We will be right back with more levels."));
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const replayButton = document.createElement("button");
    replayButton.textContent = "Exit";
    replayButton.addEventListener("click", () => {
        window.location.href = 'main.html';
        closePopup();
    });
    buttons.appendChild(replayButton);
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(buttons);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
    function closePopup() {
        document.body.removeChild(popupContainer);
    }
}

function success() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    const popup = document.createElement("div");
    popup.id = "popup";
    const heading = document.createElement("h2");
    heading.textContent = "Good Job!";
    const message = document.createElement("p");
    message.appendChild(document.createTextNode("Get ready for the next big thing!"));
    message.appendChild(document.createElement("br"));
    message.appendChild(document.createTextNode("You've rocked this Level, now it's "));
    message.appendChild(document.createElement("br"));
    message.appendChild(document.createTextNode("time to dive into the next level! 🚀"));
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const replayButton = document.createElement("button");
    replayButton.textContent = "Replay";
    replayButton.addEventListener("click", () => {
        window.location.reload();
        closePopup();
    });
    const nextLevelButton = document.createElement("button");
    nextLevelButton.textContent = "Next Level";
    nextLevelButton.addEventListener("click", () => {
        nextLevel();
        closePopup();
    });
    buttons.appendChild(replayButton);
    buttons.appendChild(nextLevelButton);
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(buttons);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
    function closePopup() {
        document.body.removeChild(popupContainer);
    }
}

function fillAll() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    const popup = document.createElement("div");
    popup.id = "popup";
    const heading = document.createElement("h2");
    heading.textContent = "Ohh No!";
    const message = document.createElement("p");
    message.textContent = "Please fill all circles with a color before submitting!";
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const replayButton = document.createElement("button");
    replayButton.textContent = "Close";
    replayButton.addEventListener("click", () => {
        closePopup();
    });
    buttons.appendChild(replayButton);
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(buttons);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
    function closePopup() {
        document.body.removeChild(popupContainer);
    }
}

function failure() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    const popup = document.createElement("div");
    popup.id = "popup";
    const heading = document.createElement("h2");
    heading.textContent = "Oops...";
    const message = document.createElement("p");
    message.appendChild(document.createTextNode("Couldn't crack this level?  "));
    message.appendChild(document.createElement("br"));
    message.appendChild(document.createTextNode("No worries! Keep pushing,"));
    message.appendChild(document.createElement("br"));
    message.appendChild(document.createTextNode("you'll get there in no time! 😊"));
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const replayButton = document.createElement("button");
    replayButton.textContent = "Replay";
    replayButton.addEventListener("click", () => {
        window.location.reload();
        closePopup();
    });
    buttons.appendChild(replayButton);
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(buttons);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
    function closePopup() {
        document.body.removeChild(popupContainer);
    }
}

function hint() {
    let hints = ["Remember, colors can repeat in the sequence!" , 
        "Start with a mix of colors to gather more clues in your first move.",
        "Think systematically: test one color at a time to confirm its position or rule it out.",
        "Use the process of elimination: narrow down possibilities by changing only one color in your next guess.",
        "Start with bold guesses to gather more clues early, then refine your approach with each attempt.",
        "Trial and error is part of the fun—every guess teaches you something new!",
        "Stay patient and observant—the solution might be closer than you think."
    ];
    const randomIndex = Math.floor(Math.random() * hints.length);
    const randomItem = hints[randomIndex];
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    const popup = document.createElement("div");
    popup.id = "popup";
    const heading = document.createElement("h2");
    heading.textContent = "Hint!";
    const message = document.createElement("p");
    message.textContent = randomItem;
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const replayButton = document.createElement("button");
    replayButton.textContent = "Close";
    replayButton.addEventListener("click", () => {
        closePopup();
    });

    buttons.appendChild(replayButton);
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(buttons);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
    function closePopup() {
        document.body.removeChild(popupContainer);
    }
}
