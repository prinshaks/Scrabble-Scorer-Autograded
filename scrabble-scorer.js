// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {

	word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         //score += Number(pointValue);
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let num1 = input.question("Let's play some scrabble! \n \n Enter a word to score: ");
   //console.log(oldScrabbleScorer(num1));
   //console.log("Let's play some scrabble! Enter a word:");
   scorerPrompt(num1);

};


let newPointStructure=transform(oldPointStructure);


let simpleScorer=function(word){
   return word.length;
};
let vowelsArray=["a","e","i","o","u"];
let vowelBonusScorer=function(word){
   let score=0;
   for (let i=0;i<word.length;i++){
    if(  vowelsArray.includes(word[i])){
      score=score+3;
      
      
    }else {score=score+1;}
    

   }
return score
}
//console.log(simpleScorer("apple"));
//console.log(vowelBonusScorer("apple"));

let scrabbleScorer=function (word) {
	let score = 0;
 	for (let i = 0; i < word.length; i++) {
			score += newPointStructure[word[i].toLowerCase()];
	}
	return score;
 };

const scoringAlgorithms = [{name:"Simple",
                            description:"One point per character",
                            scorerFunction:simpleScorer},  
                           {name:"Vowel Bonus",
                              description:"Vowels are worth 3 points",
                              scorerFunction:vowelBonusScorer
                           },
                           {name:"Scrabble",
                              description:"Uses scrabble point system",
                              scorerFunction:scrabbleScorer
                           }
                           ];

function scorerPrompt(word) {
   let num2 = input.question("Which scoring algorithm would you like to use? \n \n 0 - " + scoringAlgorithms[0]["name"] + ": " + scoringAlgorithms[0]["description"] + " \n 1 - " + scoringAlgorithms[1]["name"] + ": " + scoringAlgorithms[1]["description"] + " \n 2 - " + scoringAlgorithms[2]["name"] + ": " + scoringAlgorithms[2]["description"] + " \n Enter 0, 1, or 2: ");
   console.log(`Score for '${word}': ${scoringAlgorithms[num2].scorerFunction(word)}`); 

}

function transform(obj) {
   let newobj = {};
   for (item in obj) {
      for(let i=0;i<obj[item].length;i++){
         newobj[obj[item][i].toLowerCase()] = Number(item);
      }
   }
   return newobj;
};

 
function runProgram() {
   initialPrompt();
   
}
//runProgram();
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
