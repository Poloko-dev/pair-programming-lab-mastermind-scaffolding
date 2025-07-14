//Poloko & Pusetso
// https://jsdoc.app
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - an string representing the number of correct numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532, '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  // TODO: complete this function
  // first determine how many characters total the two strings have in common
  // This may help:
  // https://github.com/bonnie/udemy-ENZYME/blob/master/context-base/src/helpers/index.js
  //
  // then determine how many of those characters are in the right place
  // hint: iterate through characters of guess and compare to character
  // in the same position in solution
  //
  // finally, return a string in the format
  // "count of correct characters in the right place"-"count of correct
  // characters not in the right place"
  // for example, "2-1"
  //

  //Final arrays that will hold the correct characters and provide the counts
  const correctPosition = [];
  const incorrectPosition = [];
  // Split the solution and guess into arrays of characters
  const solutionChars = solution.split('');
  const guessChars = guess.split(''); 
  // Create objects to count occurrences of each character in solution and guess
  const solutionCount = {}; 
  const guessCount = {};    

  // Count characters in solution
  for (var i = 0; i < solutionChars.length; i++) {
    const char = solutionChars[i]; 
    solutionCount[char] = (solutionCount[char] || 0) + 1; 
  }

  // Count characters in guess
  for (var i = 0; i < guessChars.length; i++) {
    const char = guessChars[i];
    guessCount[char] = (guessCount[char] || 0) + 1;

  }
  // Count correct characters in the right position
  for (var i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === solutionChars[i]) {
      correctPosition.push(guessChars[i]);
      // Decrease the count in solutionCount to avoid double counting
      solutionCount[guessChars[i]]--;
      guessCount[guessChars[i]]--;
    }
  } 
  // Count correct characters not in the right position
  for (var i = 0; i < guessChars.length; i++) {
    if (guessChars[i] !== solutionChars[i] && solutionCount[guessChars[i]] > 0) {
      incorrectPosition.push(guessChars[i]);
      // Decrease the count in solutionCount to avoid double counting
      solutionCount[guessChars[i]]--;
      guessCount[guessChars[i]]--;
    }
  } 
  // Return the result in the format "correct in place - correct not in place"
  return `${correctPosition.length}-${incorrectPosition.length}`;     
   
}

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */
function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
//
const [solution, guessCount, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = processInput(solution, guesses);
console.log(output.join(" "));
