const calculator = document.querySelector('#calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('#display-result');

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
      // permettre les opérations multiples
      // j'ai automatiquement la présence de displayedNum, donc
      // si le premier opérand est présent dans mon élément html calculator
      // et j'ai déjà un opérateur de mis en place dans ce même élément html calculator
      // je veux permettre à l'utilisateur d'entrée ce type de calcul 12 + 7 - 5 * 3
      // et d'obtenir le bon résultat d'affiché sans avoir à cliqué sur =
      // mais à chaque clic sur un nouvel opérateur
      if (calculator.dataset.firstValue && calculator.dataset.operator) {
        const operator = calculator.dataset.operator;
        const firstValue = calculator.dataset.firstValue;
        const resultSeveralOperations = operate(operator, firstValue, displayedNum);
        display.textContent = Math.round(resultSeveralOperations * 1000000) / 1000000;
        calculator.dataset.firstValue = resultSeveralOperations;
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
      } else {
        // gére le premier clic sur un opérateur en enregistrant la valeur
        // avant le clic sur l'opérateur dans l'élément html calculator
        calculator.dataset.previousKeyType = 'operator';
        // je set firstValue avec la première valeur pour mon calcul
        calculator.dataset.firstValue = displayedNum;
        // je set operator pour mon calcul
        calculator.dataset.operator = action;
      }
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const secondValue = displayedNum;
      const operator = calculator.dataset.operator;
      const result = operate(operator, firstValue, secondValue);
      display.textContent = Math.round(result * 1000000) / 1000000;
      calculator.dataset.firstValue = '';
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
