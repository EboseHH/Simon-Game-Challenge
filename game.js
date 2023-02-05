let gameStarted = false;

document.addEventListener("keydown", (event) => {
  if (gameStarted === false) {
    nextSequence();
    gameStarted = true;
  }
});

let level = 0;

let gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];

// selected a random colour from the array of button colours above.
// color name is same as ID of the button so we used the name of the randomly selected color to target the button
// and used the class 'animate' to animate it
// Play the audio file associated with the selected color
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").innerHTML = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(color) {
  const audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// select all elements with class btn, add an event listener to each.
// the event listener console logs the ID of the button clicked using get attribute
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log(event.target.getAttribute("id"));
    const userChosenColor = event.target.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function animatePress(currentColour) {
  document.querySelector("#" + currentColour).classList.add("pressed");
  document.querySelector("#" + currentColour).classList.add("animate");
  setTimeout(function () {
    document.querySelector("#" + currentColour).classList.remove("pressed");
    document.querySelector("#" + currentColour).classList.remove("animate");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.querySelector("#level-title").innerHTML = "Game Over! press any key to restart";
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
