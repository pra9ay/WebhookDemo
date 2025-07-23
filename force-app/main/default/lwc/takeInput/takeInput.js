import { LightningElement } from 'lwc';

export default class TakeInput extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    title = '';

    handleInputChange(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }

    handleSave() {
        console.log('User Input Values:');
        console.log('First Name:', this.firstName);
        console.log('Last Name:', this.lastName);
        console.log('Email:', this.email);
        console.log('Phone:', this.phone);
        console.log('Title:', this.title);
    }
}