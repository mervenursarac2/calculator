const display = document.querySelector('#result');
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecond = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

document.querySelector('#mainPart').addEventListener('click', function(e) {
    const element = e.target;
    if(!element.matches('button')) return;

    if(element.classList.contains('opr')) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    if(element.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }
    if(element.classList.contains('equal')) {
        handleEqual();
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

function calculate(first, second, operator) {
    switch(operator) {
        case '+': return first + second;
        case '-': return first - second;
        case 'x': return first * second;
        case '/': return first / second;
        default: return second;
    }
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    
    if(operator && waitingForSecond) {
        operator = nextOperator;
        return;
    }

    if(firstValue == null) {
        firstValue = value;
    } else if(operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = String(result);
        firstValue = result;
    }
    
    waitingForSecond = true;
    operator = nextOperator;
}

function inputNumber(num) {
    if(waitingForSecond) {
        displayValue = num;
        waitingForSecond = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal() {
    if(waitingForSecond) {
        displayValue = '0.';
        waitingForSecond = false;
        return;
    }
    
    if(!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function handleEqual() {
    if(firstValue == null || !operator) return;
    
    const value = parseFloat(displayValue);
    const result = calculate(firstValue, value, operator);
    displayValue = String(result);
    firstValue = null;
    operator = null;
    waitingForSecond = true;
}

function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecond = false;
}