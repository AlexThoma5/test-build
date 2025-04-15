// Wait for the DOM to finish loading before running the game
// Get the button Elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "start") {
                alert("You clicked start game!");
            } else {
                let buttonType = this.getAttribute("data-type")
                alert(`You clicked ${buttonType}`)
            }
        })
    }
})

function startGame() {

}

function displayNumbers() {

}

function handleNumberClick(event) {

}

function handleOperatorClick(event) {

}

function performCalculation(num1, operator, num2) {

}

function updateNumberArray() {

}

function checkForWin() {

}