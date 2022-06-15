import { LightningElement,api } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_cmt/omniscriptBaseMixin";
//import pubsub from 'vlocity_cmt/pubsub';
import { OmniscriptActionCommonUtil } from 'vlocity_cmt/omniscriptActionUtils';

const columns = [
  
    { label: 'Name', fieldName: 'Name' },
    { label: 'Quantity', fieldName: 'Quantity' },
    { label: 'Unit Price', fieldName: 'Price' },
    { label: 'Total Price', fieldName: 'TotalPrice' }
];

export default class OrderProduct extends OmniscriptBaseMixin(LightningElement) {
@api dispPdts;
@api oid;
confirmPdts;
columns = columns;
showUI = false;




connectedCallback(){
    console.log('Child Load Check ');
    console.log('Input Lineitems  ==> '+JSON.stringify(this.dispPdts));

    this._actionUtilClass = new OmniscriptActionCommonUtil();
        
}

renderedCallback(){
    
    console.log('Display Pdts  ==> '+JSON.stringify(this.dispPdts));
    // console.log('Display Pdts length ==> '+this.dispPdts.length);
    // if(this.dispPdts.length != 0){
    //     console.log('Display child lwc');
    //     this.showUI = true;
    // }

    
}

handleClick(event){
    this.confirmPdts = true;
    console.log('button clicked===='+this.confirmPdts);

    var cEvent = new CustomEvent("readonlyorder",{
        detail:this.confirmPdts
    });

    this.dispatchEvent(cEvent);

    let inputparam={ 
        alldata: this.dispPdts,
        orderId: this.oid
    };
    console.log('this inputparam'+JSON.stringify(inputparam));

    const params = {
        input: JSON.stringify(inputparam),
        sClassName: 'vlocity_cmt.IntegrationProcedureService',
        sMethodName: 'KPN_Assign',
        options: '{}',
    };

    console.log('code check 1');

    this._actionUtilClass
            .executeAction(params, null, this, null, null)
            .then(response => {
				console.log('IP data---'+JSON.stringify(response));
             })
            .catch(error => {   
              console.log('Error message' + error);
            });

    console.log('code check 2');
}

}