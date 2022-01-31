// consts

const numbers = document.querySelectorAll (".number")
const ac = document.querySelector ("#ac")
const del = document.querySelector ("#del")
const sqrt = document.querySelector ("#sqrt")
const factorial = document.querySelector ("#factorial")
const operatorButtons = document.querySelectorAll(".operator")
const equals = document.querySelector ("#equals")
const display = document.querySelector (".display")
const minordisplay = document.querySelector(".minordisplay")
const dot = document.querySelector("#dot")

let firstOperand = ""
let secondOperand = ""
let currentOperatorSymbol = ""
let previousOperatorSymbol = ""
let result = ""
let shouldResetScreen = false


//functions

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen)
    resetScreen()
  display.textContent += number
}

function resetScreen() {
  display.textContent = ''
  shouldResetScreen = false
}

function clearEverything () {
  display.textContent = "";
  minordisplay.textContent = "";
  firstOperand = "";
  secondOperand = "";
  result = "";
  currentOperatorSymbol = "";
  previousOperatorSymbol = "";
}

function deleteLast () {
  display.textContent = Number(display.textContent.toString().slice(0, -1));
  if (minordisplay.textContent === 0) {
    display.textContent = ""
  }
}

function setOperator (operator) {
  if (firstOperand == "" || display.textContent == "") {
    currentOperatorSymbol = operator
    updateDisplay()
  }
  else if (typeof result == "number") {
    previousOperatorSymbol = currentOperatorSymbol
    currentOperatorSymbol = operator
    updateDisplay()
  }
  else {
    previousOperatorSymbol = currentOperatorSymbol
    currentOperatorSymbol = operator
    compute();
  }
}

function updateDisplay() {
  if (firstOperand == "") {
    firstOperand = Number(display.textContent)
    minordisplay.textContent = `${firstOperand} ${currentOperatorSymbol}`
    display.textContent = ""
  }

  else if (display.textContent == "") {
    minordisplay.textContent = `${firstOperand} ${currentOperatorSymbol}`
  }

  else if (typeof result == "number") {
    firstOperand = result
    minordisplay.textContent = `${result} ${currentOperatorSymbol}`
    result = ""
    display.textContent = ""
  }
}

function equalsButton () {
  previousOperatorSymbol = currentOperatorSymbol
  if (display.textContent == "") {
    return
  }
  secondOperand = Number(display.textContent)
  switch (previousOperatorSymbol) {
    case "+":
      add(firstOperand, secondOperand)
      break;
    case "-":
      substract(firstOperand, secondOperand)
      break;
    case "*":
      multiply(firstOperand, secondOperand)
      break;
    case "/":
      divide(firstOperand, secondOperand)
      break;
  }
  minordisplay.textContent = `${firstOperand} ${previousOperatorSymbol} ${secondOperand}`
  display.textContent = result
  secondOperand = ""
  firstOperand = result
}

function compute () {
  if (display.textContent == "") {
    return
  }
  secondOperand = Number(display.textContent)
  switch (previousOperatorSymbol) {
    case "+":
      add(firstOperand, secondOperand)
      updateDisplay()
      secondOperand = ""
      break;
    case "-":
      substract(firstOperand, secondOperand)
      updateDisplay()
      secondOperand = ""
      break;
    case "*":
      multiply(firstOperand, secondOperand)
      updateDisplay()
      secondOperand = ""
      break;
    case "/":
      divide(firstOperand, secondOperand)
      updateDisplay()
      secondOperand = ""
      break;
  }
}


function add(a, b) {
  result = a + b
}

function substract(a, b) {
  result = a - b
}

function multiply(a, b) {
  result = a * b
}

function divide(a, b) {
  if (b == 0) {
    display.textContent = "Undefined"
    return
  }
  result = a / b
}

function squareRoot () {
  minordisplay.textContent = "√" + display.textContent
  result = Math.sqrt(Number(display.textContent))
  display.textContent = result;
}

function calcFactorial () {
  minordisplay.textContent = display.textContent + "!"
  let a = Math.floor(Number(display.textContent));
  if (a === 0 || a === 1) {
    display.textContent = 1;
  }
  else {
    for (let i = a - 1; i>= 1; i--) {
      a *= i
      result = a
      }
    display.textContent = result;

  }
}

function addDot () {
  if (display.textContent.toString().includes(".")) {
    return
  }
  else {
    display.textContent += "."
  }
}

//event listeners

numbers.forEach((number) => 
  number.addEventListener("click", () => appendNumber(number.textContent))
)
operatorButtons.forEach((operatorButton) => 
  operatorButton.addEventListener("click", () => setOperator(operatorButton.textContent))
)
ac.addEventListener ("click", clearEverything)
del.addEventListener("click", deleteLast)
equals.addEventListener("click", equalsButton)
sqrt.addEventListener("click", squareRoot)
factorial.addEventListener("click", calcFactorial)
dot.addEventListener("click", addDot)

document.addEventListener("keydown", function(event) {
  if (event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9") {
    appendNumber (event.key)
  }
  else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    setOperator(event.key)
  }
  else if (event.key === ".") {
    addDot()
  }
  else if (event.keyCode === 13) {
  equalsButton ()
  }
  else if (event.keyCode === 8) {
  deleteLast ()
  }
  else if (event.keyCode === 46) {
  clearEverything ()
  }
})
