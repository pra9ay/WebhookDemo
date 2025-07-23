import { LightningElement,track } from 'lwc';
import getAcc from '@salesforce/apex/AccountController.getAllAcc';

export default class AccCombo extends LightningElement {
    @track value = '';
    @track accOptions  = [];


    handleChange(event){
        this.value = event.detail.value;
    }

    connectedCallback(){
        getAcc().then(result => {
            let arr = [];
            for(var i = 0 ;i<result.length;i++){
                arr.push({label:result[i].Name,value:result[i].Id});
            }

            this.accOptions = arr;
        })
    }

    get options(){
        return this.accOptions;
    }
}