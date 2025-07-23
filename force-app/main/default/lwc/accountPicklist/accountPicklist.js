import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountPicklist extends LightningElement {
    @track accountOptions = [];
    @track selectedAccountId;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountOptions = data.map(acc => ({
                label: acc.Name,
                value: acc.Id
            }));
        } else if (error) {
            console.error('Error fetching accounts: ', error);
        }
    }

    handleChange(event) {
        this.selectedAccountId = event.detail.value;
    }
}
