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
const colors = [
  'yellow', 'green', 'red', 'blue', 'white', 'black'
];

/*----- state variables -----*/
let secretCode = [];

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
//let computer pick four random colors as secrect code
const pickSecretCode = function (){
  for (i = 0; i < colors.length - 2; i++) {
    secretCode.push(colors[Math.floor(colors.length * Math.random())]);
  }
  return secretCode;
}

