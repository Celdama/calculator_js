const displayResult = document.getElementById('display-result');
const numValue = Array.from(document.querySelectorAll('.numValue'));
const addBtn = document.getElementById('addBtn');
const resultBtn = document.getElementById('resultBtn');

let displayValue = '';
let firstOperande = 0;
let secondOperande = 0;
let calcOperator = '';

addBtn.addEventListener('click', () => {
  firstOperande = Number(displayValue);
  displayValue = '';
  calcOperator = '+';
});

const populateDisplay = (num) => {
  displayResult.textContent = num;
};

numValue.forEach((num) => {
  num.addEventListener('click', () => {
    displayValue += num.textContent;
    populateDisplay(displayValue);
  });
});

const add = (a, b) => {
  displayValue = +a + +b;
  populateDisplay(displayValue);
  // console.log(displayValue);
};

const substrat = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  switch (operator) {
    case '+':
      add(a, b);
      break;
    case '-':
      substrat(a, b);
      break;
    case '*':
      multiply(a, b);
      break;
    case '/':
      divide(a, b);
      break;
    default:
      break;
  }
};

resultBtn.addEventListener('click', () => {
  secondOperande = displayValue;
  operate(calcOperator, firstOperande, secondOperande);
});
