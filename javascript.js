



// Define a variable to store the display element
var display = document.getElementById("display");

// Define a variable to store the current equation
var equation = "";

// Add a function to handle button clicks
function buttonClick(val) {
  // Handle the different button types
  switch (val) {
    case "AC":
      clearDisplay();
      break;
    case "←":
      backKey();
      break;
    case "%":
      addPercentage();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      addOperator(val);
      break;
    case ".":
      addDecimal();
      break;
    case "=":
      evaluateEquation();
      break;
    default:
      addDigit(val);
      break;
  }
}

// Add a function to clear the display
function clearDisplay() {
  equation = "";
  display.value = "";
}

// Add a function to handle backspace
function backKey() {
  equation = equation.slice(0, -1);
  display.value = equation;
}

// Add a function to add percentage to the last number in the equation
function addPercentage() {
  var nums = equation.split(/[\+\-\*\/]/);
  var lastNum = nums[nums.length - 1];
  var percentage = parseFloat(lastNum) / 100;
  equation = equation.replace(lastNum, percentage);
  display.value = equation;
}

// Add a function to add an operator to the equation
function addOperator(operator) {
  // Check if the last character is already an operator
  if (/[\+\-\*\/]$/.test(equation)) {
    // If so, replace the last operator with the new one
    equation = equation.slice(0, -1) + operator;
  } else {
    // Otherwise, just append the operator to the end of the equation
    equation += operator;
  }
  display.value = equation;
}

// Add a function to add a decimal point to the equation
function addDecimal() {
  // Check if the last number already has a decimal point
  var nums = equation.split(/[\+\-\*\/]/);
  var lastNum = nums[nums.length - 1];
  if (!/\./.test(lastNum)) {
    // If not, append a decimal point to the end of the last number
    equation += ".";
    display.value = equation;
  }
}

// Add a function to add a digit to the equation
function addDigit(digit) {
  // Check if the equation is empty
  if (equation === "") {
    // If so, just append the digit
    equation = digit.toString();
  } else {
    // Otherwise, check if the last character is a number
    var lastChar = equation.slice(-1);
    if (/\d/.test(lastChar)) {
      // If so, append the digit to the end of the last number
      equation += digit.toString();
    } else {
      // Otherwise, start a new number with the digit
      equation += " " + digit.toString();
    }
  }
  display.value = equation;
}

// Add a function to evaluate the equation
function evaluateEquation() {
  // Check if the last character is an operator
  var lastChar = equation.slice(-1);
  if (/[\+\-\*\/]/.test(lastChar)) {
    // If so, remove it
    equation = equation.slice(0, -1);
  }
  // Use the eval() function to evaluate the equation
  var result = eval(equation);
  // Display the result
  display.value = result;
  //

}

/////////////////////////////////////////////////////////////////////////////////////////////////


function buttonClick(val) {
    var display = document.getElementById("display");
    if (val === "%") {
      var text = display.value;
      if (text.length > 0 && !isNaN(text)) { // check if input is a number
        var num = parseFloat(text);
        display.value = num + val; // append percentage sign to number
      }
    } else {
      display.value = display.value + val; // append non-percentage value
    }
  }
  
  function clearDisplay() {
    document.getElementById("display").value = "";
  }
  
  function equalClick() {
    var text = document.getElementById("display").value;
    var result;
    if (text.indexOf("%") !== -1) { // check if percentage sign is present
      var num = parseFloat(text);
      result = num / 100; // convert to percentage value
    } else {
      result = eval(text); // perform calculation
    }
    document.getElementById("display").value = result;
  }
  
  function backKey() {
    var display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
  }
  
  // listen for keydown event and handle keyboard input
  document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode;
    var display = document.getElementById("display");
    if ((keyCode >= 48 && keyCode <= 57) || // numbers 0-9
        (keyCode >= 96 && keyCode <= 105)) { // numpad 0-9
      buttonClick(event.key);
    } else if (keyCode === 8) { // backspace
      backKey();
    } else if (keyCode === 13 || keyCode === 187) { // enter or equals sign
      equalClick();
    } else if (keyCode === 27) { // escape
      clearDisplay();
    } else if (keyCode === 46) { // delete
      display.value = "";
    } else if (keyCode === 106) { // numpad multiply
      buttonClick("*");
    } else if (keyCode === 107) { // numpad add
      buttonClick("+");
    } else if (keyCode === 109) { // numpad subtract
      buttonClick("-");
    } else if (keyCode === 111) { // numpad divide
      buttonClick("/");
    } else if (keyCode === 110 || keyCode === 190) { // decimal point or period
      buttonClick(".");
    } else if (keyCode === 37) { // left arrow
      display.selectionStart -= 1;
    } else if (keyCode === 39) { // right arrow
      display.selectionStart += 1;
    }
  });
  