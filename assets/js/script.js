// Wait for the DOM to finish loading before running the game
// Get the button Elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "start") {
                startGame();
            } else if (this.getElementsByClassName("game-btn")){
                handleNumberClick(event);
            } else {
                alert(`You clicked ${data-type}`);
            }
        })
    }

})

/** The main game "loop", called when the game is first loaded
 * and after the users answer has been processed
 */
function startGame() {

    let num1 = null;
    let operator = null;
    let num2 = null;

    displayNumbers();

}

function getRandomSet() {

    // Array of numbers that will be used in the game
    const numbersArray = [[8,8,2,7], [8,8,4,1], [6,6,8,2], [2,7,4,8], [1,5,6,3]];

    // Creates random number between 0 and the array length
    const randomNum = Math.floor(Math.random() * numbersArray.length);
        
    // Stores random array from numbers array into variable
    const randomSet = numbersArray[randomNum];
    
    return randomSet;
}

function displayNumbers() {
    
    // Stores the randomSet from the numbers array into a variable
    const selectedNums = getRandomSet();
    
    // Inserts the numbers from the selected array into each button
    document.getElementById('operand1').innerText = selectedNums[0];
    document.getElementById('operand2').innerText = selectedNums[1];
    document.getElementById('operand3').innerText = selectedNums[2];
    document.getElementById('operand4').innerText = selectedNums[3];

}

// Variables needed for handle number function
let lastClickedButton = null;
let step = 1;
let chosenNumber = null;

function handleNumberClick(event) {

    // stores clicked button into a variable
    const clickedButton = event.currentTarget;
    
    // Deselect if same button clicked
    if (clickedButton === lastClickedButton) {
        clickedButton.classList.toggle("selected");
        chosenNumber = null;
        lastClickedButton = null;
    } else {
        // Deselect previous button if any
        if (lastClickedButton) {
            lastClickedButton.classList.remove("selected"); 
        }
        // Select new button
        clickedButton.classList.add("selected");
        lastClickedButton = clickedButton;
        chosenNumber = clickedButton.innerText;
    }

    if (step === 1) {
        num1 = chosenNumber;
    } else if (step === 3) {
        num2 = chosenNumber;
    }

    console.log(`num1: ${num1}`);
    console.log(`num2: ${num2}`);
}

function handleOperatorClick(event) {
    if (step === 2) {

    }
}

function performCalculation(num1, operator, num2) {

}

function updateNumberArray() {

}

function checkForWin() {

}