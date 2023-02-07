const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let secretNumber;

let numAttemps;


let checkGuess = number => {
    if (number > secretNumber) {
        console.log("Too high.");
        return false
    } else if (number < secretNumber) {
        console.log("Too low.");
        return false
    } else {
        console.log("Correct!");
        return true
    }
}

let askGuess = () => {
 
    numAttemps--;
    rl.question("Enter a guess: ", (guess) => {

        if (checkGuess(Number(guess))) {
            console.log('You win!');
            rl.close();
        } else {
            if (numAttemps > 0) {
                askGuess();
            } else {
                console.log('You lose!')
                rl.close();
            }
        }
        
    })
}

let randomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

let askRange = () => {
    rl.question('Enter a max number: ', maxNum => {
        rl.question('Enter a min number: ', minNum => {
            console.log(`I'm thinking of a number between ${minNum} and ${maxNum}...`)
            secretNumber = randomInRange(Number(minNum), Number(maxNum));
            askGuess();
        })
        
    })
}

let askLimit = () => {
    rl.question('Define a max number of attempts: ', answer => {
        numAttemps = Number(answer);
        askRange();
    })
}

askLimit();