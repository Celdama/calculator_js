const displayResult = document.getElementById('display-result');
const numsBtn = Array.from(document.querySelectorAll('.numBtn'));
const addBtn = document.getElementById('addBtn');
const resultBtn = document.getElementById('resultBtn');

const displayValue = null;
const firstOperande = null;
const secondOperande = null;
const result = null;
const calcOperator = null;

const add = function (a, b) {
  return a + b;
};

const substract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (operator, firstOperande, secondOperande) {
  if (operator === '+') {
    return add(firstOperande, secondOperande);
  }
};
