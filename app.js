const displayResult = document.getElementById('display-result');
const numValue = Array.from(document.querySelectorAll('.numValue'));

let displayValue = 0;

const populateDisplay = (num) => {
  displayResult.textContent = num;
};

numValue.forEach((num) => {
  num.addEventListener('click', () => {
    displayValue = num.textContent;
    populateDisplay(displayValue);
  });
});

const add = (a, b) => a + b;

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

operate('/', 2, 4);
