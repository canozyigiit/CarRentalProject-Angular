import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carForm:FormGroup
  brands:Brand[]
  colors:Color[]
  car:Car
  carDetail:CarDetail
  carDetails:CarDetail[]
  currentCarId?:number
 constructor(private carService:CarService,private toastrService:ToastrService,private formBuilder:FormBuilder,
  private colorService:ColorService,private brandService:BrandService) { }

 ngOnInit(): void {
   this.getAllCars()
   this.getAllBrand()
   this.getAllColor()
   this.createCarForm()
 }
 createCarForm(){
  this.carForm=this.formBuilder.group({
    carId:["",Validators.required],
    brandId:["",Validators.required],
    colorId:["",Validators.required],
    modelYear:["",Validators.required],
    dailyPrice:["",Validators.required],
    description:["",Validators.required],
    findexScore:["",Validators.required]
  })
 }
getAllCars(){
 this.carService.getCars().subscribe(respone=>{
   this.carDetails=respone.data
 })
}
getAllBrand(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data
  })
}
getAllColor(){
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data
  })
}
refresh(){
 window.location.reload();
}

setCurrentCarId(carId?:number){
 this.currentCarId=carId
 console.log(this.currentCarId)
}
/* delete(car: Car) { 
  let deletedCar:Car = {carId:car.carId};
-   this.carService.delete(deletedCar).subscribe(response=>{
     this.toastrService.success(response.message,"Başarılı")
   },responseError=>{
     this.toastrService.error("Araba silinemedi")
   })

} */
update(){
  this.carForm.patchValue({carId:this.currentCarId})
  let carModel=Object.assign({},this.carForm.value)
  if(this.carForm.valid){
    this.carService.update(carModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
    },
    responseError=>{
     if(responseError.error.ValidationErrors.length > 0) {
       for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
         this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage)
       }
     }
    }
    )
  }else{
    this.toastrService.error("Eksik Bilgi Girdiniz")
  }
}
}