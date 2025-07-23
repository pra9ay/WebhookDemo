import { LightningElement, api, wire } from 'lwc';
import getContactsForAccount from '@salesforce/apex/ContactController.getContactsForAccount';

export default class AccountContacts extends LightningElement {
    @api recordId;
    contacts;
    error;

    columns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];

    @wire(getContactsForAccount, { accountId: '$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}

