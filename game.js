var buttonColors = ["green", "red", "yellow", "blue"];


var gamePattern = [];
var userClickedPattern = [];


var start = false;
var level = 0;

function nextSequence() {
    var randomNumber = (Math.floor(Math.random() * 4));
    level++;
    $("h1").text("Level " + level);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).keypress(function () {
    if (!start) {
        $("h1").text("Level " + level);
        nextSequence();
        start = true;
    }
})


$(".btn").click(function (event) {
    // console.log(event);

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})


function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () { $("#" + currentColor).removeClass("pressed") }, 100);
}

function checkAnswer(currentLevel) {
    
    // console.log(userClickedPattern);
    // console.log(gamePattern);


    if ((userClickedPattern[currentLevel] != gamePattern[currentLevel]) || gamePattern.length === 0) {
        $("h1").text("Game Over. Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        gamePattern = [];
        userClickedPattern = [];
        start = false;
        level=0;
    }
    else{
        if(userClickedPattern.length===gamePattern.length){
            userClickedPattern=[];
            setTimeout(function(){nextSequence()},1000); 
        }
        
    }

}