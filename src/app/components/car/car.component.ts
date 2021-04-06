import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  dataLoaded = false;;
  carDetails:CarDetail[];
  carDetail:CarDetail;
  filterText:""
  baseUrl = "http://localhost:5000/";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
    private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.getCars();
    this.clearLocalStorage()
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
          this.getCarsByColor(params["colorId"]);  
      }else if(params["carId"]){
        this.getCarDetailsByCar(params["carId"]);
      }
    })
  }

  getCars() {
   this.carService.getCars().subscribe(response=>{
     this.carDetails = response.data;
     this.dataLoaded =true;
   })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded =true;
    })
}
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded =true;
  })
}

  getCarDetailsByCar(carId:number){
    this.carService.getCarDetailsByCar(carId).subscribe(response=>{
      this.carDetails=response.data;
    })
  }
  getCarDetails(){
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data;
    })
  }
  clearLocalStorage(){
    this.localStorageService.remove("car")
    this.localStorageService.remove("payment-data")
  }
  getFilteredCars(brandId:number,colorId:number){
    this.carService.getFilteredCars(colorId,brandId).subscribe(response=>{
      this.carDetails=response.data
    })
  }
}
