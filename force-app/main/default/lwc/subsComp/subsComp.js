import { LightningElement, api, wire } from 'lwc';
import MyMessageChannel from '@salesforce/messageChannel/myMessageChannel__c';
import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';

export default class SubsComp extends LightningElement {
    @api name = '';
    @api age = '';
    subscription = null;

    @wire(MessageContext) messageContext;

    connectedCallback() {
        this.handleSubscribe();
    }

    disconnectedCallback() {
        this.handleUnsubscribe();
    }

    handleSubscribe() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, MyMessageChannel, (message) => {
                this.name = message.name;
                this.age = message.age;
            });
        }
    }

    handleUnsubscribe() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
