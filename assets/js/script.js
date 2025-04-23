// Wait for the DOM to finish loading before running the game
/** The main game "loop", called when the game is first loaded
 * and after the users answer has been processed
 */

document.addEventListener("DOMContentLoaded", function(){
    
    // Game state lives here (idea Taken from chatGPT)
    const gameState = {
        num1: null,
        num2: null,
        operator: null,
        clickedOp: null,
        lastClickedOp: null,
        lastClickedButton: null,
        step: 1,
        chosenNumber: null,
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
        
        // Inserts the numbers from the selected array into each button
        document.getElementById('operand1').innerText = selectedNums[0];
        document.getElementById('operand2').innerText = selectedNums[1];
        document.getElementById('operand3').innerText = selectedNums[2];
        document.getElementById('operand4').innerText = selectedNums[3];

    }

    const operatorArea = document.querySelector(".operator-area");

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
                gameState.step = 1; 
            }
            // Select new button
            clickedButton.classList.add("selected");
            gameState.lastClickedButton = clickedButton;
            gameState.chosenNumber = clickedButton.innerText;
            gameState.step = 2;
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

    function performCalculation(num1, operator, num2) {

    }

    function updateNumberArray() {

    }

    function checkForWin() {

    }

    function manageGameState() {
       
        if (gameState.step === 2) {
            gameState.num1 = gameState.chosenNumber;
            operatorArea.style.display = "block";
        } else if (gameState.step === 3) {
            gameState.num2 = gameState.chosenNumber;
        } else if (gameState.step === 1) {
            operatorArea.style.display = "none";
            gameState.lastClickedOp.classList.remove("selected");
            gameState.operator = null;
        }

        console.log("----------------------------");
        console.log(`step is: ${gameState.step}`);
        console.log(`num1: ${gameState.num1}`);
        console.log(`op: ${gameState.operator}`);
        // console.log(`num2: ${num2}`);
    }

    // Get the button Elements and add event listeners to them
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "start"){
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
