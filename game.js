let buttonColours = ["red", "blue", "green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let clicks = 1;
function nextSequence(){
        let randomNumber = Math.round(Math.random()*4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).addClass(`pressed`)
        playSound(randomChosenColour);
        setTimeout(function(){
            $("#"+randomChosenColour).removeClass("pressed")
        }, 200);
        level += 1;
        $("#level-title").text(`level: ${level}`);
};

    $(document).on("keydown", function(){
        if(started == false){
        started = true;
        nextSequence();
    }else{
        alert("you have already started the game")
    }
    });


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
    $("#level-title").text(`Game Over, Press Any Key to Restart`);
}
function checkAnswer(currentLevel){
    if(JSON.stringify(currentLevel) === JSON.stringify(gamePattern)){
        playSound(currentLevel[currentLevel.length-1]);
        setTimeout(function(){
            userClickedPattern = [];
            nextSequence();
        }, 1000);
    }else{
        console.log(userClickedPattern)
        console.log(gamePattern)
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        setTimeout(function(){
            playSound("wrong");
        }, 100);
        startOver();
    }
}
function playSound(name){
    let audio = new Audio("./sounds/"+ name+".mp3");
        audio.play();
};
function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
        },200);
}
$(".btn").click(function(event){
    let clickColour = this.classList[1];
    userClickedPattern.push(clickColour);
    animatePress(clickColour);
    console.log(clicks)
    if(clicks == level){
    checkAnswer(userClickedPattern);
    clicks = 1;
    }else{
        clicks += 1;
    }
    
});


