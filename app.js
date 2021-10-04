const calculator = document.querySelector('#calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('#display-result');
const copyrightYear = document.querySelector('.copyright-year');

copyrightYear.textContent = ` ${new Date().getFullYear()} `;

const roundedResult = (num) => Math.round(num * 1000000) / 1000000;

const clearCalculator = () => {
  calculator.dataset.firstValue = '';
  display.textContent = 0;
  calculator.dataset.operator = '';
  calculator.dataset.previousKeyType = '';
};

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

keys.addEventListener('click', (e) => {
  if (e.target.matches('button') || e.target.matches('i')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // pas d'action, c'est donc une key de chiffre
    if (!action) {
      // j'affiche la valeur dans l'écran
      // permet à l'utilisateur d'entrer des nombres
      if (displayedNum === '0' || previousKeyType === 'operator' || display.textContent === 'Not Good') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'percent') {
      if (displayedNum !== 0) {
        display.textContent = displayedNum / 100;
      }
    }

    if (action === 'decimal') {
      // ne pas permettre à l'utilisateur d'ajouter plusieurs décimals
      if (!display.textContent.includes('.')) {
        display.textContent = `${displayedNum}.`;
      }
    }

    if (action === 'delete') {
      // permettre à l'utilisateur de delete le dernier chiffre à l'écran en cas d'erreur
      // impossible si il ne reste qu'un chiffre à l'écran
      if (display.textContent !== '0' && display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
      }
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
        const result = operate(operator, firstValue, displayedNum);
        display.textContent = roundedResult(result);
        calculator.dataset.firstValue = result;
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
      // ne fait rien si les 2 opérande et l'opérateur ne sont pas défini
      // évite les bugs de repartir à zero si je cliques sur =
      // sans que mes 2 opérandes soit définies
      if (calculator.dataset.firstValue && calculator.dataset.operator) {
        const firstValue = calculator.dataset.firstValue;
        const secondValue = displayedNum;
        const operator = calculator.dataset.operator;
        const result = operate(operator, firstValue, secondValue);
        // divide by 0 dont crash my calculator
        if (result === Infinity) {
          display.textContent = 'Not Good';
        } else {
          display.textContent = roundedResult(result);
        }
        calculator.dataset.firstValue = '';
      }
    }

    if (action === 'clear') {
      clearCalculator();
    }
  }
});
