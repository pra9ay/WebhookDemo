import { LightningElement, api } from 'lwc';

export default class RecordViewComp extends LightningElement {
    @api recordId;
    @api objectApiName = 'Account';
}
