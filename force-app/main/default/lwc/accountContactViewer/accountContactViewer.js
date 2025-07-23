import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountContactController.getAccounts';
import getContactsByAccountId from '@salesforce/apex/AccountContactController.getContactsByAccountId';

export default class AccountContactViewer extends LightningElement {
    @track accountOptions = [];
    @track selectedAccountId;
    @track contacts = [];
    @track error;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountOptions = data.map(acc => ({ label: acc.Name, value: acc.Id }));
        } else if (error) {
            this.error = error;
        }
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.detail.value;
        getContactsByAccountId({ accountId: this.selectedAccountId })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = [];
            });
    }
}
