var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

// This function detects when a keyboard is pressed for the first time, call nextSequence()
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        // when the game has started, change h1 title to say "Level 0"
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Start over if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence() {
    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
    userClickedPattern = [];

    // Increase the level by one each time a nextSequence is called.
    level++;
    // Update the h1 with a change in the value of level
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    // Add the pressed class to the button that gets clicked
    $(".btn" + currentColour).addClass("pressed");

    // Remove the class after 100 milliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver() {
    // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}
