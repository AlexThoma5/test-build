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
