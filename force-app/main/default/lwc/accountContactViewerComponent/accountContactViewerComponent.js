import { LightningElement, track } from 'lwc';
import getContactsByAccountName from '@salesforce/apex/AccountContactController.getContactsByAccountName';

export default class AccountContactViewer extends LightningElement {
    @track searchKey = '';
    @track contacts;
    @track error;

    columns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    handleSearchChange(event) {
        this.searchKey = event.target.value;
        if (this.searchKey.length >= 2) {
            this.fetchContacts();
        } else {
            this.contacts = undefined;
        }
    }

    fetchContacts() {
        getContactsByAccountName({ accountName: this.searchKey })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.contacts = undefined;
                this.error = error.body.message;
            });
    }
}
