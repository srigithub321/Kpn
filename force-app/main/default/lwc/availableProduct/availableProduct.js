import { LightningElement,api } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_cmt/omniscriptBaseMixin";

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Price', fieldName: 'Pirce' },
    {type: "button", typeAttributes: {  
        label: 'Add to Order',  
        name: 'Add to Order',  
        title: 'Add to Order',  
        disabled: false,  
        value: 'Add to Order',  
        iconPosition: 'left'  
    }}, 
];

export default class AvailableProduct extends OmniscriptBaseMixin(LightningElement) {

    @api avaPdts;
    @api orderId;
    orderPdts = [];
    data = [];
    columns = columns;
    readOnlyOrder = false;
    //showData = false;

    connectedCallback(){
        console.log('Load Check ');
        console.log('Input Lineitems  ==> '+JSON.stringify(this.avaPdts));
        console.log('Input Order Id   ==> '+this.orderId);
        this.data = this.avaPdts
    }

    callRowAction(event){
        // const abc = event.detail.action.name; 
        // console.log('action name ==='+abc);
        const pId = event.detail.row.ProductId;
        const pName = event.detail.row.Name;
        const pPrice = event.detail.row.Pirce;
        console.log('Selected Pdt Id === '+ pId +'Selected PName====' + pName);
        this.showData = true;

        var found = this.orderPdts.find(e => e.ProductId == pId);
        
        if(typeof found !== 'undefined'){
            console.log('need to update the existing value' + JSON.stringify(found));
            this.orderPdts.forEach(currentItem => {
                if(currentItem.ProductId ==  found.ProductId){
                    currentItem.Quantity = found.Quantity + 1;
                    currentItem.TotalPrice = (currentItem.Quantity)*(currentItem.Price);
                }
            })
        }
        else{
            console.log('inside else block=====');
            this.orderPdts.push({
                'ProductId':pId,
                'Name':pName,
                'Quantity':1,
                'Price':pPrice,
                'TotalPrice':pPrice,
                'OrderId':this.orderId

            });
        }
        console.log('Order Pdt array===='+JSON.stringify(this.orderPdts));
        this.orderPdts = [...this.orderPdts];
        //this.showData = true;

    }

    handlereadonly(event){
        console.log('event read from parent mehtod');
        this.readOnlyOrder = event.detail;
        console.log('event value passed from child'+this.readOnlyOrder);

    }

}