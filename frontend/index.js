import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let currentValue = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentValue += value;
            display.value = currentValue;
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentValue);
            } else {
                calculate();
            }
            operator = value;
            currentValue = '';
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clear();
        }
    });
});

async function calculate() {
    if (firstOperand !== null && currentValue !== '') {
        const secondOperand = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    const divisionResult = await backend.divide(firstOperand, secondOperand);
                    result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                    break;
            }

            display.value = result;
            firstOperand = result;
            currentValue = '';
        } catch (error) {
            console.error('Calculation error:', error);
            display.value = 'Error';
        }
    }
}

function clear() {
    currentValue = '';
    operator = '';
    firstOperand = null;
    display.value = '';
}
