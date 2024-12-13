import { Component } from '@angular/core';
import { CargoType } from '../../models/cargo-type.model';
import { Inputdata } from '../../models/inputdata.model';
import { CargoTypeService } from '../../services/cargo-type.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-cargo-type',
  templateUrl: './cargo-type.component.html',
  styleUrl: './cargo-type.component.css'
})
export class CargoTypeComponent {
  cargoType:CargoType ={
    cargoTypeId: 0,
    cargoTypeName: "",
    cargoWeight: 0,
    handlingFee: 0
  };

  jsonData?:string
  blobData?:Inputdata
  cargoTypeList = new Array<Object>();
 
  constructor(private cargotypeservice:CargoTypeService,private storageService:StorageService)
  {
 
  }
    ngOnInit()
    {
      this.getAll();
    }
    addCargo()
    {
      this.cargotypeservice.addCargo(this.cargoType).subscribe({
        next:(response) =>{
          alert('CargoType added...........');
          this.getAll();
        },
        error:(error)=>{
          alert('Error....!!!');
        }
      });
      this.jsonData =JSON.stringify(this.cargoType);
      this.blobData ={data:this.jsonData }
      this.storageService.sendDataToBlob(this.blobData).subscribe({
      next:(response)=>{
        console.log('Blob added with Order Details')
      },
      error:(error)=>{
        console.log(error);
      }
    })
    }
 
    getAll()
    {
      this.cargotypeservice.getAll().subscribe({
        next:(response) =>{
          this.cargoTypeList = response;
        },
        error:(error)=>
        {
          alert('Error....!!!');
        }
      });
    }
 
  
    deleteCargo(id: number)
    {
      this.cargotypeservice.deleteCargo(id).subscribe({
        next: (response) => {
          alert('cargoType deleted successfully');
          this.getAll(); 
          this.cargoType=response;
        },
        error: (error) => {
          alert('Error occurred while deleting cargotype');
        }
      });
    }
 
    updateCargoType()
    {
      this.cargotypeservice.updateCargoType(this.cargoType).subscribe({
        next: (response) => {
          alert('cargoType updated successfully');
          this.getAll(); 
          this.cargoType = new CargoType();
         
        },
        error: (error) => {
          alert('Error occurred while updating cargoType');
        }
      });
    }
}

