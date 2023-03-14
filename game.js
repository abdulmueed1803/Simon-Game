let gamePattern = [];
let userClickedPattern = [];
let level = 0;

//keypressing for the first time starts the game
let keyPress=0;
$(document).on("keypress",function(){
    keyPress++;
    if(keyPress == 1){
        $("#heading").text("Level "+level);
        nextSequence();
    } 
});

//handling button clicks 
$(".item").on("click", function(event){
    let buttonClicked =  event.target;
    let userChosenColor = $(buttonClicked).attr("id");
    userClickedPattern.push(userChosenColor);
        
    //playing sound whenever button gets clicked
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern = [];
    level++ ; 
    $("#heading").text("Level "+level); 

    let randomNumber = Math.floor(Math.random() * 4);
    let colorsArray = ["green", "red", "yellow","blue"];
    let randomChosenColor = colorsArray[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("length of game: "+gamePattern.length);
    console.log(gamePattern);
    //animation
    animatePress(randomChosenColor);
    //playing the sound
    playSound(randomChosenColor);

}

function checkAnswer(currentLength){

    if(userClickedPattern[currentLength] != gamePattern[currentLength]){
        gameOver();
        startOver();
        return ;
    }


    if(gamePattern.length == userClickedPattern.length){
        setTimeout(() => {
            nextSequence();
          }, 1000);

    }
}


function gameOver(){
    $("#heading").text("Game over!, Press any key to restart");
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },140);
}

//function for starting over
function startOver(){
    level= 0;
    keyPress = 0;
    gamePattern = [];
}

//function for animation
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");  //removing the added class
    },100);
}


//function for playing the sound
function playSound(color){
    let sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}


