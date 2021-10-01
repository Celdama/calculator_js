const calculator = document.querySelector('#calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('#display-result');

console.log(keys);

// const calculate = (n1, operator, n2) => {
//   let result = '';

//   if (operator === 'add') {
//     result = parseFloat(n1) + parseFloat(n2);
//   } else if (operator === 'substract') {
//     result = parseFloat(n1) - parseFloat(n2);
//   } else if (operator === 'multiply') {
//     result = parseFloat(n1) * parseFloat(n2);
//   } else if (operator === 'divide') {
//     result = parseFloat(n1) / parseFloat(n2);
//   }

//   return result;
// };

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    // pas d'action, c'est donc une key de chiffre
    if (!action) {
      // j'affiche la valeur dans l'écran
      // permet à l'utilisateur d'entrer des nombres
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'decimal') {
      display.textContent = `${displayedNum}.`;
    }

    // gerer les calculs
    if (action === 'add' || action === 'substract' || action === 'divide' || action === 'multiply') {
      // je set operator pour que la valeur de mon display soit remplacé avec une nouvelle valeur
      calculator.dataset.previousKeyType = 'operator';
      // je set firstValue avec la première valeur pour mon calcul
      calculator.dataset.firstValue = displayedNum;
      // je set operator pour mon calcul
      calculator.dataset.operator = action;
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const secondValue = displayedNum;
      const operator = calculator.dataset.operator;
      display.textContent = operate(operator, firstValue, secondValue);
    }
  }
});

const add = (a, b) => parseFloat(a) + parseFloat(b);

const substract = (a, b) => parseFloat(a) - parseFloat(b);

const multiply = (a, b) => parseFloat(a) * parseFloat(b);

const divide = (a, b) => parseFloat(a) / parseFloat(b);

const operate = (operator, firstOperande, secondOperande) => {
  let result = null;
  if (operator === 'add') {
    result = add(firstOperande, secondOperande);
  } else if (operator === 'substract') {
    result = substract(firstOperande, secondOperande);
  } else if (operator === 'multiply') {
    result = multiply(firstOperande, secondOperande);
  } else if (operator === 'divide') {
    result = divide(firstOperande, secondOperande);
  }
  return result;
};
