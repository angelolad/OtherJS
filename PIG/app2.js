/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

** added rules: 
- A player losses his entire score if he rolls two 6s in a now. After that it will be the next player's turn 
- Before the game starts the user can input the winning scores, 
- Add a second dice to the game, player looses there score if one of them rolls a 1 
*/
var scores, roundScore,activePlayer, gamePlaying,prevRoll,prevRoll2,winningScore;
init();

var x = document.querySelector('#score-0').textContent;
console.log(x);

//anonymous functions: functions that do not have a name, used 
//when you dont need to use this function elsewhere 
document.querySelector('.btn-roll').addEventListener('click',function() {
    if(gamePlaying){
    //1. Random number 
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
  
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    console.log("---------");
    console.log('Dice: ' + dice);
    console.log('Prev: ' + prevRoll);


    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    console.log('Dice2: ' + dice2);
    console.log('Prev2: ' + prevRoll2);
  

    //3. Update the round score IF the roller number was NOT a 1 
    if ((prevRoll === 6 && dice === 6) || (prevRoll2 ===6 && dice ===6) || dice === 1 || dice2 ===1){
        //Next player 
        nextPlayer();
    }
    else {
         //add score
         roundScore += dice + dice2;
         document.querySelector('#current-' + activePlayer).textContent = roundScore;
         prevRoll = dice; 
         prevRoll2 = dice2;
       
   }
}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
    //Add CURRENT score to GLOBAL score 
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores [activePlayer];

    //Check if the player won the game over 100 or equal to 100 pts 
    if (scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying=false;
    }
    else{
        //Next player
        nextPlayer();
    }
    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; 

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelectory('.player-0-panel').classList.remove('active');
    //document.querySelectory('.player-1-panel').classList.add('active');
    
    document.querySelector(".dice").style.display ='none';
    document.querySelector(".dice2").style.display ='none';
}

document.querySelector('.btn-new').addEventListener('click',function (){
   init();
});

function init() {

    /*var numberCheck = false;
    while (numberCheck === false){
        winningScore = prompt("Set the winning score:", parseInt(100) );
        if (winningScore === null || winningScore === "" || isNaN(winningScore)) {
                alert("Please input a valid number");
                numberCheck = false;
        }
        else {
            numberCheck = true;
        }
    }*/

        scores = [0,0];
        activePlayer = 0;
        roundScore = 0;
        prevRoll=0;
        gamePlaying = true;
   
        //Hiding the dice object when it starts 
        document.querySelector(".dice").style.display ='none';
        document.querySelector(".dice2").style.display ='none';

        document.getElementById('score-0').textContent = '0'; 
        document.getElementById('score-1').textContent = '0'; 
        document.getElementById('current-0').textContent = '0'; 
        document.getElementById('current-1').textContent = '0'; 
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active'); 
    
        document.querySelector('.player-0-panel').classList.add('active'); 

}
