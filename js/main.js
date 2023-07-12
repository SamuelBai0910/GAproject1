/*
Pseudocode for the overall gameplay
0.Check on the console when finished one step, don't run too far.
1.Create a object to store data of code pegs {yello:1, ...white:6}
2.Create a object to store data of key pegs {black:1, wihte:0}
3.Generate a random secret code consisting of colored pegs. done
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

//

//find out which row is selected now, other rows don't change styles.
let currentRow;

/*----- state variables -----*/
//Make sure computer just pick secret code one time when clicked the startBtn.
let gameStarted = false;

//Create a variable to store the secret code.
let secretCode = [];

//Create a variable to store the codepeg that be clicked curretly.
let currentCodePeg = null;

//Create a variable to store the codepeg that already selected color
let currentRowPeg = null;

//Create a variable to store the color that be selected.
let selectedColor;

//Create a variable to store the statement of game.
let gameEnded = true;



/*----- cached elements  -----*/
//pick secret code when clicked the start button
const startBtn = document.getElementById('startBtn');

//Cache the confirm button
const confirmBtn = document.getElementById('confirmBtn');

//Create an array that contains all div.codePegs, can use array.length to get row information.
const codePegRows = document.querySelectorAll('.codePegs');

//Create an array that contains all div.codePeg
const codePegs = document.querySelectorAll('.codePeg');

//cache colors divs to add event listener to store the color that be picked.
const colorSelections = document.querySelectorAll('.color');

//Translate all HTML element needed to array.
// const currentRow9Arr = Array.from(codePegRows[9].children);
// const currentRow8Arr = Array.from(codePegRows[8].children);
// const currentRow7Arr = Array.from(codePegRows[7].children);
// const currentRow6Arr = Array.from(codePegRows[6].children);
// const currentRow5Arr = Array.from(codePegRows[5].children);
// const currentRow4Arr = Array.from(codePegRows[4].children);
// const currentRow3Arr = Array.from(codePegRows[3].children);
// const currentRow2Arr = Array.from(codePegRows[2].children);
// const currentRow1Arr = Array.from(codePegRows[1].children);
// const currentRow0Arr = Array.from(codePegRows[0].children);
const numRows = codePegRows.length;
const currentRowArrays = [];

for (var i = 0; i < numRows; i++) {
  currentRowArrays[i] = Array.from(codePegRows[i].children);
}

/*----- event listeners -----*/
//only the codePeg that be clicked can change style.
startBtn.addEventListener ('click', function() {
  //make sure there's only pick secretCode one time when start button clicked
  if (!gameStarted) {
    pickSecretCode();
    gameStarted = true;
    console.log(secretCode);
  }
  //Control selections using DOM with adding classname 'selectable'.
  const initialCodePegs =   Array.from(codePegRows[9].children);
  initialCodePegs.forEach((codePeg) => {
    codePeg.classList.add('selectable');
  });
  //initialize the color of all codePegs
  for (let i = 0; i < 40; i++) {
    let codePeg = codePegs[i];
    codePeg.style.backgroundColor = 'gray';
  }
});

//codePeg change style when it's clicked, others won't.
for (const codePeg of codePegs) {
  codePeg.addEventListener('click', function(evt) {
    //Style of codePeg should be initialazition when not be clicked.
    if (currentCodePeg) {
      currentCodePeg.style.boxShadow = 'none';
    } 
    //Style of codePeg should be changed when clicked, only happens in codePeg with classname 'selectable'.
    currentCodePeg = evt.target;
    if (currentCodePeg.classList.contains('selectable')){
      currentCodePeg.style.boxShadow = '2px 2px 2px 1px #1c0303';
    }
  });
}

//Use array[],DOM classname 'selected', background of codePeg to manage which row can be selected from array[9] to array [0]. Based on add event listener to confirm button.

confirmBtn.addEventListener('click', function() {
  // console.log(currentRow9Arr);
  // console.log(currentRow9Arr[0].style.backgroundColor);
  // for (currentRowArr of currentRow9Arr) {
  //   if (currentRowArr.style.backgroundColor !== 'gray') {
  //     console.log('noGray');
  //   } else {
  //     console.log('Gray');
  //   }
  // }
  const isGray = currentRow9Arr.some((currentRowArr) => currentRowArr.style.backgroundColor === 'gray');
  console.log(isGray);
  if (isGray === false) {
    currentRow9Arr.forEach((codePeg) => {
      codePeg.classList.remove('selectable');
    });
    codePegRows[8].forEach((codePeg) => {
      codePeg.classList.add('selectable');
    });
  }
});


//make sure the id name of clicked color is the backgroundcolor of codePeg
for (const colorSelection of colorSelections) {
  colorSelection.addEventListener('click', function(evt) {
    selectedColor = evt.target.id;
    if (currentCodePeg.classList.contains('selectable')) {
      currentCodePeg.style.backgroundColor = selectedColor;
    } 
  });
}

/*----- functions -----*/
//let computer pick four random colors as secrect code
const pickSecretCode = function () {
  //'4' also can be a variable if want to change the length of codePeg.
  for (let i = 0; i < 4; i++) {
    secretCode.push(colors[Math.floor(colors.length * Math.random())]);
  }
  return secretCode;
}




