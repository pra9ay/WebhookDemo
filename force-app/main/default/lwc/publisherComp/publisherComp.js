import { LightningElement, api, wire } from 'lwc';
import MyMessageChannel from '@salesforce/messageChannel/myMessageChannel__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class PublisherComp extends LightningElement {
    @api name = '';
    @api age = '';
    
    @wire(MessageContext) messageContext;

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleAgeChange(event) {
        this.age = event.target.value;
    }

    handleClick() {
        const payload = {
            name: this.name,
            age: this.age
        };
        publish(this.messageContext, MyMessageChannel, payload);
    }
}
