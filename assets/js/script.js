// Wait for the DOM to finish loading before running the game
/** The main game "loop", called when the game is first loaded
 * and after the users answer has been processed
 */

document.addEventListener("DOMContentLoaded", function(){
    
    // Allows the operator area to be hidden when not in use
    const operatorArea = document.querySelector(".operator-area");

    // Function that is called after every time the user presses a number
    // Mananges the how game behaves depending on what step it is in
    function manageGameState() {
       
        if (gameState.step === 2) {
            gameState.num1 = gameState.chosenNumber; // num1 is the button user clicks
            gameState.num1ButtonIndex = gameState.index; // Tracks the index of num1 button to update array
            operatorArea.style.display = "block"; // Once user has clicked a number, the operators appear
        } else if (gameState.step === 3) {
            gameState.num2 = gameState.chosenNumber; // num2 is the button user clicks
            gameState.num2ButtonIndex = gameState.index; // Tracks the index of num1 button to update array
            performCalculation(gameState.num1, gameState.operator, gameState.num2);
        } else if (gameState.step === 4) {
            storeNumberArray(); // Store the number array so we can backtrack with undo button later on
            updateNumberArray(); // After calculation update the array
            displayNumbers(); // Update the UI to reflect the updated array
            resetGameState(); // Reset variables to send the user back to step 1
        } else if (gameState.step === 1) {
            resetGameState(); // Resets gameState if user tries to calculate a negative number
        }

        console.log("----------------------------");
        console.log(gameState);
    }

    // Game state object lives here (idea taken from chatGPT)
    const gameState = {
        num1: null,
        num1ButtonIndex: null,
        num2: null,
        num2ButtonIndex: null,
        num3: null,
        operator: null,
        clickedOp: null,
        lastClickedOp: null,
        lastClickedButton: null,
        index: null,
        step: 1,
        chosenNumber: null,
        activeArray: [],
        round: 1,
        initialArrayCopy: [],
        secondVersionArray: [],
        thirdVersionArray: [],
        fourthVersionArray: [],
    };

    function getRandomSet() {

        // Array of number sets that will be used in the game
        const numbersArray = [[8,8,2,7], [8,8,4,1], [6,6,8,2], [2,7,4,8], [1,5,6,3]];

        // Creates random number between 0 and the array length
        const randomNum = Math.floor(Math.random() * numbersArray.length);
            
        // Stores random array from numbers array into variable
        const randomSet = numbersArray[randomNum];
        
        return randomSet;
    }

    function displayNumbers() {
        
        // Only if the games step is equal to one, get a new set of numbers
        if (gameState.step === 1) {

            // Stores the randomSet from the numbers array into a variable
            const selectedNums = getRandomSet();

            // Stores the live version of the array into the gameState for tracking
            gameState.activeArray = selectedNums;

        }

        // Inserts the numbers from the selected array into each button
        document.getElementById('operand1').innerText = gameState.activeArray[0];
        document.getElementById('operand2').innerText = gameState.activeArray[1];
        document.getElementById('operand3').innerText = gameState.activeArray[2];
        document.getElementById('operand4').innerText = gameState.activeArray[3];

        // Stores all number buttons into a variable
        const numberButtons = document.getElementsByClassName('game-btn');

        // Loops through number buttons to check if they are empty, if they are update UI and remove empty buttons
        for (let button of numberButtons) {
            if (button.innerText === "") {
                button.style.display = 'none'
            } else {
                button.style.display = 'inline-block'
            }
        }

    }

    function handleNumberClick(event) {

        // stores clicked button into a variable
        const clickedButton = event.currentTarget;

        // Stores the index of clicked button
        gameState.index = parseInt(clickedButton.getAttribute("data-index"));

        // Deselect if same button clicked
        if (clickedButton === gameState.lastClickedButton) {
            clickedButton.classList.toggle("selected");
            gameState.chosenNumber = null;
            gameState.lastClickedButton = null;
            gameState.step = 1;
            gameState.num1 = null;
        } else {
            // Deselect previous button if any
            if (gameState.lastClickedButton) {
                gameState.lastClickedButton.classList.remove("selected");
            }
            // Select new button
            clickedButton.classList.add("selected");
            gameState.lastClickedButton = clickedButton;
            gameState.chosenNumber = clickedButton.innerText;

            if (!gameState.operator) {
                // No operator selected yet - This means the user is selecting the first number
                gameState.step = 2;
            } else {
                // Operator already selected - This means to user is selecting the second number
                gameState.step = 3;
            }
        }

        manageGameState();
    }

    function handleOperatorClick(event) {
        // Stores the clicked operator into a variable
        const clickedOp = event.currentTarget;

        // Deselect operator if same operator clicked
        if(gameState.lastClickedOp === clickedOp) {
            clickedOp.classList.toggle("selected");
            gameState.operator = null;
            gameState.lastClickedOp = null;
            gameState.step = 2;
        } else {
            // Deselect previous operator if it exists
            if (gameState.lastClickedOp) {
                gameState.lastClickedOp.classList.remove("selected");
            }
            // Select new operator
            clickedOp.classList.add("selected");
            gameState.lastClickedOp = clickedOp;
            gameState.operator = clickedOp.innerText;
            gameState.step = 3;
        }

        console.log("----------------------------");
        console.log(`step is: ${gameState.step}`);
        console.log(`operator: ${gameState.operator}`);
    }

    // function to perform calculation between selected numbers and update step
    function performCalculation(num1, operator, num2) {
        
        let answer;

        switch(operator){
            case '+':
                answer = parseInt(gameState.num1) + parseInt(gameState.num2);
                break;
            case '-':
                answer = parseInt(gameState.num1) - parseInt(gameState.num2);
                break;
            case '*':
                answer = parseInt(gameState.num1) * parseInt(gameState.num2);
                break;
            case '/':
                answer = parseInt(gameState.num1) / parseInt(gameState.num2);
                break;
        }

        // Checks if the answer is positive and an integer before assigning num3 and moving the game to step 4
        // if not, num3 is not updated and user is sent back to step 1
        if (answer > 0 && Number.isInteger(answer)) {
            gameState.num3 = answer;
            gameState.step = 4;
            manageGameState(); // recalls game state function, to perform step 4  
        } else {
            alert("You can only use whole and positive numbers!");
            gameState.step = 1;
            manageGameState();
        }
    }

    function updateNumberArray() {
        
        // Sets the num1 number to null in the array
        gameState.activeArray[gameState.num1ButtonIndex] = null;

        // Sets num2 number to the calculated number (num3) in the array
        gameState.activeArray[gameState.num2ButtonIndex] = gameState.num3;
    }

    function storeNumberArray() {

        if (gameState.round === 1) {
            gameState.initialArrayCopy = gameState.activeArray.slice(); // Create a copy of the array to store
            gameState.round++;
        } else if (gameState.round === 2) {
            gameState.secondVersionArray = gameState.activeArray.slice();
            gameState.round++;
        } else if (gameState.round === 3) {
            gameState.thirdVersionArray = gameState.activeArray.slice();
            gameState.round++;
        } else if (gameState.round === 4) {
            gameState.fourthVersionArray = gameState.activeArray.slice();
            gameState.round = 1;
        }
    }

    function checkForWin() {

    }

    function resetGameState() {
        
        // Removes class from any highlighted button when gameState is reset - Checks if it exists first to prevent error
        if (gameState.lastClickedButton) {
            gameState.lastClickedButton.classList.remove("selected");
        }
        // Removes class from lastClickedOp - Checks if it exists first to prevent error
        if (gameState.lastClickedOp) {
            gameState.lastClickedOp.classList.remove("selected");
        }
        
        // Resets variables back to original state
        gameState.num1 = null;
        gameState.num1ButtonIndex = null;
        gameState.num2 = null;
        gameState.num2ButtonIndex = null;
        gameState.num3 = null;
        gameState.index = null;
        gameState.operator = null;
        gameState.clickedOp = null;
        gameState.lastClickedOp = null;
        gameState.lastClickedButton = null;
        gameState.step = 1;
        gameState.chosenNumber = null;
        operatorArea.style.display = 'none';
    }

    // Get the button Elements and add event listeners to them
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "start"){
                resetGameState();
                displayNumbers();
            } else if (this.classList.contains("game-btn")){
                handleNumberClick(event);
            } else if (this.classList.contains("operator-btn")){
                handleOperatorClick(event);
            } else {
                alert(`You clicked ${data-type}`);
            }
        })
    }

})
