import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  carImage: CarImage[] = [];
  carDetail: CarDetail[];
  customer: Customer;
  customerId: number;
  rentalControl = new Boolean();
  findeksLoad = new Boolean();
  findeksError = new Boolean();
  findeksMsg: string;
  baseUrl = 'http://localhost:5000/';
  rentalMessage = '';
  userId:number=this.localStorageService.getUser().id

  constructor(
    private carImageService: CarimageService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private authService: AuthService,
    private customerService: CustomerService,
    private findexService: FindexService,
    private carService: CarService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
       
        this.getCarDetailsByCar(params['carId']);
        this.getImagesByCar(params['carId']);
        this.getRentalControl(params['carId']);
      }
    });
    this.isLogOK();
    this.getCustomer();
  }

  getCarDetailsByCar(carId: number) {
    this.carService.getCarDetailsByCar(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.setCar();
    });
   
  }

  getImagesByCar(carId: number) {
    this.carImageService.getCarImagesByCar(carId).subscribe((response) => {
      this.carImage = response.data;
    });
  }

  getRentalControl(carId: number) {
    //will be held
    this.rentalService.getRentalCarControl(carId).subscribe((response) => {
      (this.rentalControl = response.successStatus),
        (this.rentalMessage = response.message);
    });
  }
  isLogOK() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  getCustomer() {
    this.customerService.getCustomerByUserId(this.userId).subscribe(
      (response) => {
        console.log(response)
        this.customer = response.data;
        this.localStorageService.setItem('customer', this.customer);
      },
    );
  }
  setCar() {
    this.localStorageService.setItem('car', this.carDetail[0]);
  }

  /* customerCheck(event: any) {//will be held
    this.findeksLoad = false;
    this.findexService
      .check(this.cars[0].carId, this.customers[0].customerId)
      .subscribe(
        (response) => {
          this.findeksMsg = response.message;
          this.findeksLoad = true;
          this.findeksError = false;
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            console.log(responseError.error.Errors);
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.findeksMsg = responseError.error.Errors[i].ErrorMessage;
            }
          }
          this.findeksLoad = true;
          this.findeksError = true;
        }
      );
  } */
  customerCheck(event: any) {
    this.findeksLoad = false;
    this.findexService
      .check(this.carDetail[0].carId, this.customer.customerId)
      .subscribe(
        (response) => {
          if (response.successStatus) {
            this.findeksMsg = response.message;
            this.findeksLoad = true;
            this.findeksError = false;
          }
        },
        (responseError) => {
          if (responseError.error.Errors) {
            console.log(responseError.error.Errors);
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.findeksMsg = responseError.error.Errors[i].ErrorMessage;
            }
          }
          this.findeksLoad = true;
          this.findeksError = true;
          this.localStorageService.remove('customer');
        }
      );
  }
}
