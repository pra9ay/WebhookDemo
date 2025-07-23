import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {firstNumber = 0;
    secondNumber = 0;
    result = null;

    get resultAvailable() {
        return this.result !== null;
    }

    handleFirstNumberChange(event) {
        this.firstNumber = parseFloat(event.target.value);
    }

    handleSecondNumberChange(event) {
        this.secondNumber = parseFloat(event.target.value);
    }

    handleAdd() {
        this.result = this.firstNumber + this.secondNumber;
    }

    handleSubtract() {
        this.result = this.firstNumber - this.secondNumber;
    }

    handleMultiply() {
        this.result = this.firstNumber * this.secondNumber;
    }
}