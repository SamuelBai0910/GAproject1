/*
Pseudocode for the overall gameplay
0.Check on the console when finished one step, don't run too far.
1.Create a object to store data of code pegs {yello:1, ...white:6}
2.Create a object to store data of key pegs {black:1, wihte:0}
3.Generate a random secret code consisting of colored pegs.
4.Write a init function that render() when game end.
5.Set the maximum guesses round number of 10.
6.Repeat untill player win or runs out of guesses round.
  6.1. Display the game board with the current guess history.
  6.2. Validate the player's guess.
  6.3. Evaluate the player's guess against the secret code and provide feedback.
  6.4. Add the player's guess to the guess history.
  6.5. Decrease the number of remaining guesses.
7.Display a victory message if player wins.
8.Display a defeat message and reveal the secret code if player runs out of guesses round.
*/

/*----- constants -----*/
//Create a constant to store the value of colors.
const colors = [
  'yellow', 'green', 'red', 'blue', 'white', 'black'
];

/*----- state variables -----*/
//Create a variable to store the secret code.
let secretCode = [];

//Create a variable to store the codepeg that be clicked curretly.
let currentCodePeg = null;

//Create a variable to store the color that be selected.
let selectedColor;

//Make sure computer just pick secret code one time when clicked the startBtn.
let gameStarted = false;

/*----- cached elements  -----*/
const codePegs = document.querySelectorAll('.codePeg');
//cache colors divs to add event listener to store the color that be picked.
const colorSelections = document.querySelectorAll('.color');
//pick secret code when clicked the start button
const startBtn = document.getElementById('startBtn');

/*----- event listeners -----*/
//only the codePeg that be clicked can change style.
startBtn.addEventListener ('click', function() {
  if (!gameStarted) {
    pickSecretCode();
    gameStarted = true;
    console.log(secretCode);
  }
});

//codePeg change style when it's clicked, others won't.
for (const codePeg of codePegs) {
  codePeg.addEventListener('click', function(evt) {
    if (currentCodePeg) {
      currentCodePeg.style.boxShadow = 'none';
    } 
    currentCodePeg = evt.target;
    currentCodePeg.style.boxShadow = '2px 2px 2px 1px #1c0303';
  });
}

//make sure the id name of clicked color is the backgroundcolor of codePeg
for (const colorSelection of colorSelections) {
  colorSelection.addEventListener('click', function(evt) {
    selectedColor = evt.target.id;
    if (currentCodePeg) {
      currentCodePeg.style.backgroundColor = selectedColor;
    }
  });
}

/*----- functions -----*/
//let computer pick four random colors as secrect code
const pickSecretCode = function () {
  for (let i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(colors.length * Math.random())]);
  }
  return secretCode;
}




