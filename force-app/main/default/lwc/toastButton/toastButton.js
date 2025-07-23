import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ToastButton extends LightningElement {
    handleClick() {
        const evt = new ShowToastEvent({
            title: 'Success!',
            message: 'Button was clicked.',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}
