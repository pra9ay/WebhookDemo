import { LightningElement } from 'lwc';

export default class First extends LightningElement {
 x;   
 handlechange(event){
    this.x=event.target.value;
 }

handleClick(event){
console.log(this.x);
this.x='';


}


}