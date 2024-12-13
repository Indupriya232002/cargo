import { Component } from '@angular/core';
import { CargoOrder } from '../../models/cargo-order.model';
import { CargoOrderService } from '../../services/cargo-order.service';

@Component({
  selector: 'app-cargo-order',
  templateUrl: './cargo-order.component.html',
  styleUrl: './cargo-order.component.css'
})
export class CargoOrderComponent {

  cargoOrder:CargoOrder={
    orderId: 0,
    pickUpDate: new Date,
    deliveryDate: new Date,
    cargoType : "",
    source : "",
    destination : "",
    cargoOrderWeight : 0,
   };
   deleteBtn?:boolean=false;
   updateBtn?:boolean=false;
   cargoOrderList = new Array<Object>();
 
    constructor(private cargoorderservice:CargoOrderService)
    {
  
    }

    ngOnInit()
  {
    this.getAllCargoOrders();
  }
  
    createANewCargoOrder()
    {
      this.cargoorderservice.createANewCargoOrder(this.cargoOrder).subscribe({
        next:(response) =>{
          alert('Order added...........');
          this.getAllCargoOrders();
        },
        error:(error)=>{
          alert('Error....!!!');
        }
      });
  
    }
  
    getAllCargoOrders()
    {
      this.cargoorderservice.getAllCargoOrders().subscribe({
        next:(response) =>{
          this.cargoOrderList = response;
        },
        error:(error)=>
        {
          alert('Error....!!!');
        }
      });
    }
  
    getCargoOrderByAddress(address: string):void
    {
      this.cargoorderservice.getCargoOrderByAddress(address).subscribe({
        next:(response)=>{
          this.cargoOrder=response;
          this.updateBtn=true;
        },
        error:(error)=>{
          alert('Inavlid Input');
        }
      });

    }

    getCargoOrderByStatus(status: string): void
    {
      this.cargoorderservice.getCargoOrderByStatus(status).subscribe({
        next:(response)=>{
          this.cargoOrder=response;
          this.updateBtn=true;
        },
        error:(error)=>{
          alert('Inavlid Input');
        }
      });
    }

    updateCargoOrder()
    {
      this.cargoorderservice.updateCargoOrder(this.cargoOrder).subscribe({
        next:(response)=>{
          alert('Order details updated successfully!!!!!!');
          this.getAllCargoOrders();
          this.updateBtn=false;
        },
        error:(error)=>{
          alert('Inavlid Input');
        }
      });
    }
   
    deleteCargoOrder(id: number)
    {
      this.cargoorderservice.deleteCargoOrder(id).subscribe({
        next:(response)=>{
          alert('Order Deleted Successfully !!!!!!!!!')
          this.getAllCargoOrders();
          this.cargoOrder=response;
          this.deleteBtn=true;
        },
        error:(error)=>{
          alert('Invalid input');
        }
      });

    } 

}
