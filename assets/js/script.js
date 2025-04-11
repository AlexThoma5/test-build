// Global variables
let num1 = null;
let operator = null;
let num2 = null;
let selectedButton = null; //used to track selected button

// Array of numbers that will be used in the game
const numbersArray = [
    [8,8,2,7], [8,8,4,1], [6,6,8,2], [2,7,4,8], [1,5,6,3]
];


// function to get a random set of numbers from the numbersArray
function getRandomSet() {
    // Create a random number between 0 and the length of the numbersArray
    const randomNum = Math.floor(Math.random() * numbersArray.length);
    // Select random set of numbers from the array
    const randomSet = numbersArray[randomNum];
    return randomSet;
}

// store the random set of numbers in a variable
const selectedNumbers = getRandomSet();

function assignOperands(numbers) {
    document.getElementById('operand1').innerText = numbers[0];
    document.getElementById('operand2').innerText = numbers[1];
    document.getElementById('operand3').innerText = numbers[2];
    document.getElementById('operand4').innerText = numbers[3];
}

// Call the function to display the numbers on each button
assignOperands(selectedNumbers);

console.log(selectedNumbers);

// Get the buttons
const gameButtons = document.querySelectorAll('.game-btn');
// Loop through the buttons and add an event listener to each button
function logValue(e) {
    const clickedButton = e.currentTarget;
    // Allows you to deselect your selected button
    if (clickedButton === selectedButton) {
        clickedButton.classList.toggle("selected");
        num1 = null;
        selectedButton = null;
    } else {
        // if another button is selected, remove its class
        if (selectedButton) {
            selectedButton.classList.remove("selected");
        }
        // select new button and add class to it
        clickedButton.classList.add("selected");
        num1 = clickedButton.innerText;
        selectedButton = clickedButton;
    }

    console.log(num1)
}

for (let gameButton of gameButtons) {
    gameButton.addEventListener("click", logValue);
}

