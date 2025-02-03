class Calculator {
  constructor() {
    this.display = document.querySelector('.display');
    this.buttons = document.querySelectorAll('button');
    this.currentValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.shouldResetDisplay = false;

    this.initialize();
  }

  initialize() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.handleButtonPress(button.dataset.value));
    });
  }

  handleButtonPress(value) {
    if (/\d/.test(value)) {
      this.handleNumber(value);
    } else if (value === '.') {
      this.handleDecimal();
    } else if (['+', '-', '×', '÷'].includes(value)) {
      this.handleOperator(value);
    } else if (value === '=') {
      this.handleEquals();
    } else {
      this.handleSpecial(value);
    }
  }

  handleNumber(num) {
    if (this.shouldResetDisplay) {
      this.currentValue = num;
      this.shouldResetDisplay = false;
    } else {
      this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
    }
    this.updateDisplay();
  }

  handleDecimal() {
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
      this.updateDisplay();
    }
  }

  handleOperator(op) {
    if (this.operator !== null) this.handleEquals();
    this.firstOperand = parseFloat(this.currentValue);
    this.operator = op;
    this.shouldResetDisplay = true;
  }

  handleEquals() {
    if (this.operator === null || this.shouldResetDisplay) return;
    
    const secondOperand = parseFloat(this.currentValue);
    let result;
    
    switch (this.operator) {
      case '+': result = this.firstOperand + secondOperand; break;
      case '-': result = this.firstOperand - secondOperand; break;
      case '×': result = this.firstOperand * secondOperand; break;
      case '÷': result = secondOperand === 0 ? 'Error' : this.firstOperand / secondOperand; break;
    }

    if (result === 'Error') {
      this.currentValue = 'Error';
      this.resetCalculator();
    } else {
      this.currentValue = result.toString().length > 10 ? result.toExponential(5) : result.toString();
      this.firstOperand = result;
    }
    
    this.operator = null;
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  handleSpecial(value) {
    switch (value) {
      case 'AC':
        this.resetCalculator();
        break;
      case '±':
        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
        break;
      case '%':
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        break;
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.textContent = this.currentValue;
  }

  resetCalculator() {
    this.currentValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }
}

new Calculator();
