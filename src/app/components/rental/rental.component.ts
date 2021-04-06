import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  rentalForm: FormGroup;
  closeAddExpenseModal: any;
  minDate: string | null;
  rentDate: string | null;
  returnDate: string | null;
  date: Date;
  totalPrice: number = 0;
  totalDay: number = 1;
  customer: Customer = this.localStorageService.getCustomer();
  car: Car = this.localStorageService.getCar();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dateApply();
    this.priceCalculator();
    this.createRentalAddForm();
  }

  createRentalAddForm() {
    this.rentalForm = this.formBuilder.group({
      rentDate: [this.minDate, Validators.required],
      returnDate: [this.minDate, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      totalPrice: [this.car.dailyPrice, Validators.required],
      totalDay: [1, Validators.required],
      carId: [this.car.carId, Validators.required],
      customerId: [this.customer.customerId, Validators.required],
    });
  }

  dateApply() {
    this.date = new Date();
    this.rentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.returnDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.rentDate = event.target.value;
  }

  returnDateChangeEvent(event: any) {
    this.returnDate = event.target.value;
    this.priceCalculator();
  }

  priceCalculator() {
    if (this.rentDate != null && this.returnDate != null) {
      var date1 = new Date(this.returnDate);
      var date2 = new Date(this.rentDate);

      var difference = date1.getTime() - date2.getTime();
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalDay = numberOfDays + 1;
      this.totalPrice = this.totalDay * this.car.dailyPrice;
    }
  }

  paymentRoute() {
    if (this.rentalForm.valid) {
      localStorage.setItem(
        'payment-data',
        JSON.stringify(this.rentalForm.value)
      );
      this.closeModal.nativeElement.click();
      this.toastr.warning('Ödeme sayfasına yönlendiriliyosunuz');
      this.router.navigate(['/payment']);
    } else {
      this.toastr.error('Form Hatalı');
    }
  }
}
