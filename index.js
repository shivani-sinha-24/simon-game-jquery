let userClickedPattern = [];

let buttonColors = ["green", "red", "yellow", "blue"];

let started = false;
let level = 0;

let gamePattern = [];

$(document).keypress(() => {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  const randomNum = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColors[randomNum];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click((e) => {
  const userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  console.log((userClickedPattern[userClickedPattern.length-1]));
  
  checkAnswer(userClickedPattern.length-1)
  
});

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    
    if((userClickedPattern[currentLevel])==gamePattern[currentLevel]){
         console.log(userClickedPattern);
        console.log(gamePattern);
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
            console.log('right');
        }
    }
    else{
        console.log('wrong');
        $('body').addClass('game-over');
        let audio = new Audio('sounds/wrong.mp3')
        audio.play()
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 500);
        startOver()
    }
}

function startOver(){
    $("#level-title").text("Press A Key to Start" );
    level=0;
    gamePattern =[]
    userClickedPattern = [];
    started = false
    $(document).keypress(() => {
        if (!started) {
          $("#level-title").text("level" + level);
          nextSequence();
          started = true;
        }
      });
}