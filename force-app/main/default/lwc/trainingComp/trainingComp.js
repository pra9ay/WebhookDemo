import { LightningElement, api } from 'lwc';

export default class RecordViewFormConditional extends LightningElement {
    @api recordId;
    @api objectApiName;
    showFields = true;

    toggleFields() {
        this.showFields = !this.showFields;
    }
}