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
            gameState.num1ButtonLocation = gameState.lastClickedButton; // Tracks the location of num1 button to use for UI updates
            operatorArea.style.display = "block"; // Once user has clicked a number, the operators appear
        } else if (gameState.step === 3) {
            gameState.num2 = gameState.chosenNumber; // num2 is the button user clicks
            gameState.num2ButtonLocation = gameState.lastClickedButton; // Tracks the location of num2 button to use for UI updates
            performCalculation(gameState.num1, gameState.operator, gameState.num2);
            console.log(gameState.num3);
        } else if (gameState.step === 4) {
            gameState.num1ButtonLocation.style.display = 'none'; // Hides num1Button after succesful calculation
        } else if (gameState.step === 1) {
            resetGameState();
        }

        console.log("----------------------------");
        console.log(gameState);
    }

    // Game state lives here (idea Taken from chatGPT)
    const gameState = {
        num1: null,
        num1ButtonLocation: null,
        num2: null,
        num2ButtonLocation: null,
        num3: null,
        operator: null,
        clickedOp: null,
        lastClickedOp: null,
        lastClickedButton: null,
        step: 1,
        chosenNumber: null,
        activeArray: [],
    };

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
 
        gameState.activeArray = selectedNums;
        
        // Inserts the numbers from the selected array into each button
        document.getElementById('operand1').innerText = gameState.activeArray[0];
        document.getElementById('operand2').innerText = gameState.activeArray[1];
        document.getElementById('operand3').innerText = gameState.activeArray[2];
        document.getElementById('operand4').innerText = gameState.activeArray[3];

    }

    function handleNumberClick(event) {

        // stores clicked button into a variable
        const clickedButton = event.currentTarget;
        
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
                // No operator selected yet → selecting first number
                gameState.step = 2;
            } else {
                // Operator already selected → selecting second number
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
        
        switch(operator){
            case '+':
                gameState.num3 = parseInt(gameState.num1) + parseInt(gameState.num2);
                gameState.step = 4;
                console.log("----------------------------");
                console.log(`step is: ${gameState.step}`);
                console.log(`${gameState.num1} + ${gameState.num2} = ${gameState.num3}`);
                break;
            case '-':
                gameState.num3 = parseInt(gameState.num1) - parseInt(gameState.num2);
                gameState.step = 4;
                console.log("----------------------------");
                console.log(`step is: ${gameState.step}`);
                console.log(`${gameState.num1} - ${gameState.num2} = ${gameState.num3}`);
                break;
            case '*':
                gameState.num3 = parseInt(gameState.num1) * parseInt(gameState.num2);
                gameState.step = 4;
                console.log("----------------------------");
                console.log(`step is: ${gameState.step}`);
                console.log(`${gameState.num1} * ${gameState.num2} = ${gameState.num3}`);
                break;
            case '/':
                gameState.num3 = parseInt(gameState.num1) / parseInt(gameState.num2);
                gameState.step = 4;
                console.log("----------------------------");
                console.log(`step is: ${gameState.step}`);
                console.log(`${gameState.num1} / ${gameState.num2} = ${gameState.num3}`);
                break;
        }

        manageGameState();
    }

    function updateNumberArray() {

    }

    function checkForWin() {

    }

    function resetGameState() {
        
        // Removes class from any highlighted button when game is reset
        if (gameState.lastClickedButton) {
            gameState.lastClickedButton.classList.remove("selected");
        }
        // Removes class from lastClickedOp - Checks if it exists first to prevent error
        if (gameState.lastClickedOp) {
            gameState.lastClickedOp.classList.remove("selected");
        }
        
        // Resets all variables back to original state
        gameState.num1 = null;
        gameState.num2 = null;
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
                displayNumbers();
                resetGameState();
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
