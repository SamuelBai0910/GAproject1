/*----- constants -----*/
//Create a constant to store the value of colors.
const colors = [
  'yellow', 'green', 'red', 'blue', 'white', 'black'
];

/*----- state variables -----*/
//Make sure computer just pick secret code one time when clicked the startBtn.
let gameStarted = false;

//Create a variable to store the secret code.
let secretCode = [];

//Create a variable to store the secret code.
let currentKeyPegs = [];

//Create a variable to store the codepeg that be clicked curretly.
let currentCodePeg = null;

//Create a variable to store the codepeg that already selected color
let currentRowPeg = null;

//Create a variable to store the color that be selected.
let selectedColor;

//Create a variable to store the statement of game.
let gameEnded = true;

//
let row = 9;

/*----- cached elements  -----*/
//pick secret code when clicked the start button
const startBtn = document.getElementById('startBtn');

//Cache the confirm button
const confirmBtn = document.getElementById('confirmBtn');

//Create an array that contains all div.codePegs, can use array.length to get row information.
const codePegRows = document.querySelectorAll('.codePegs');

//Create an array that contains all div.keyPegs, can use array.length to get row information.
const KeyPegRows = document.querySelectorAll('.keyPegs');

//Create an array that contains all div.codePeg
const codePegs = document.querySelectorAll('.codePeg');

//Create an array that contains all div.secretCode.
const shield = document.querySelectorAll('.secretCode');

//Create an array that contains all div.keyPeg
const keyPegs = document.querySelectorAll('.keyPeg');

//cache colors divs to add event listener to store the color that be picked.
const colorSelections = document.querySelectorAll('.color');

//Translate currentCodePeg and currentKeyPeg to array.
const numRows = codePegRows.length;
const currentCodePegArr = [];
const currentKeyPegArr = [];
let guessCode = [];

for (let i = 0; i < numRows; i++) {
  currentCodePegArr[i] = Array.from(codePegRows[i].children);
  currentKeyPegArr[i] = Array.from(KeyPegRows[i].children);
}

//Cache the <h1> to show result
const result = document.querySelector('#title');

/*----- event listeners -----*/
//only the codePeg that be clicked can change style.
startBtn.addEventListener ('click', function() {
  //make sure there's only pick secretCode one time when start button clicked
  result.innerText = 'MasterMind';
  shield.forEach((keyPeg) => {
    keyPeg.style.backgroundColor = ('gray');
  })
  if (!gameStarted) {
    pickSecretCode();
    gameStarted = true;
    console.log(secretCode);
  }
  //Control selections using DOM with adding classname 'selectable'.
  const initialCodePegs = Array.from(codePegRows[9].children);
  initialCodePegs.forEach((codePeg) => {
    codePeg.classList.add('selectable');
  });
  //initialize the color of all codePegs
  for (let i = 0; i < 40; i++) {
    let codePeg = codePegs[i];
    codePeg.style.backgroundColor = 'gray';
    codePeg.style.boxShadow = 'none';
  }
  //initialize the color of all keyPegs
  for (let i = 0; i < 40; i++) {
    let keyPeg = keyPegs[i];
    keyPeg.style.backgroundColor = 'gray';
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
  //find background color 'gray' in current row.
  const isGray = currentCodePegArr[row].find((codePeg) => codePeg.style.backgroundColor === 'gray');

  if (isGray) {
    return;
  } else {
    PickGuessCode()
    console.log(guessCode);
    currentCodePegArr[row].forEach((codePeg) => {
      codePeg.classList.remove('selectable');
    });    
    compareCodes()
    showResult()
    currentCodePegArr[row - 1].forEach((codePeg) => {
      codePeg.classList.add('selectable');
    });
    row = row - 1;
    initGuessCode()
    console.log(row);
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

const PickGuessCode = function () {
  for (let i = 0; i < 4; i++) {
    if (guessCode.length < 4) {
    guessCode.push(currentCodePegArr[row][i].style.backgroundColor);
  } else {
    return guessCode;
  }
}
}

const initGuessCode = function() {
  guessCode = [];
}

const compareCodes = function() {

  const blackKeyIndexes = [];
  const whiteKeyIndexes = [];

  for (let i = 0; i < secretCode.length; i++) {
    if (secretCode[i] === guessCode[i]) {
      blackKeyIndexes.push(i);
    } else if (secretCode.includes(guessCode[i])) {
      whiteKeyIndexes.push(i);
    }
  }

  for (const index of [...blackKeyIndexes, ...whiteKeyIndexes]) {
    const currentKeyPegs = currentKeyPegArr[row];

    const randomIndex = Math.floor(Math.random() * currentKeyPegs.length);
    const currentKeyPeg = currentKeyPegs[randomIndex];
    
    if (blackKeyIndexes.includes(index)) {
      currentKeyPeg.style.backgroundColor = 'black';
    } else {
      currentKeyPeg.style.backgroundColor = 'white';
    }
    
    currentKeyPegs.splice(randomIndex, 1);
  }
  return;
};

const showResult = function() {
  const guessCodeStr = guessCode.join('');
  const secretCodeStr = secretCode.join('');

  if (guessCodeStr === secretCodeStr) {
    openShield()
    showWin()
    gameEnd()
  } else if (guessCodeStr !== secretCodeStr && row === 0) {
    openShield()
    showLose()
    gameEnd()
    return;
  } 
}

const openShield = function () {
  for (let i = 0; i < 4; i++) {
    shield[i].style.backgroundColor = secretCode[i];
  }
}

const showWin = function () {
  result.innerText = 'You win! Master!';
} 

const showLose = function () {
  result.innerText = 'Try again?';
} 

const gameEnd = function () {
  codePegs.forEach((codePeg) => {
    codePeg.classList.remove('selectable');
    codePeg.style.boxShadow = 'none';
  })
}


//Quick test the losing result
const testGameResult = function() {
  codePegs.forEach((codePeg) => {
    codePeg.style.backgroundColor = 'red';
  });
    openShield()
    showLose()
    gameEnd()
}
// testGameResult()