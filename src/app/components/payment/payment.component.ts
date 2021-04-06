import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentDate: string | null;
  returnDate: string | null;
  totalDay: string | null;
  dailyPrice: string | null;
  totalPrice: string | null;
  paymentAddForm: FormGroup;
  paymentSuccess: boolean = false;
  paymentError: boolean;
  paymentWait: boolean = false;
  customerId: number;
  creditCards: CreditCard[] = [];
  creditCardId: number;
  cardNumber:string;
  customer:Customer=this.localStorageService.getCustomer()

  @ViewChild('btnCardSave') cardSaveModal: ElementRef;
  @ViewChild('cardSaveModalClose') cardSaveModalClose: ElementRef;
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private creditCardService:CreditcardService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private localStorageService:LocalStorageService
  ) {}

 

  ngOnInit(): void {
    this.rentalData();
    this.createPaymentAddForm();
  }

  rentalData() {
    if (localStorage.getItem('payment-data') === null) {
      this.router.navigate(['/cars']);
    }
    var rentValue = JSON.parse(localStorage.getItem('payment-data') || '{}');
    this.rentDate = rentValue.rentDate;
    this.returnDate = rentValue.returnDate;
    this.totalDay = rentValue.totalDay;
    this.dailyPrice = rentValue.dailyPrice;
    this.totalPrice = rentValue.totalPrice;
    this.customerId = rentValue.customerId;
    this.getCards();
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      userId: [this.customer.userId, Validators.required],
      cardNumber: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      cvv: ['', Validators.required],
      cardMonth: ['', Validators.required],
      cardYear: ['', Validators.required],
    });
  }

  getCards() {
    this.creditCardService.getAllCustomerCardId(this.customerId).subscribe((response) => {
      if (response.successStatus) {
        this.creditCards = response.data;
      }
    });
  }

  paymentAdd() {
    console.log(this.paymentAddForm)
    if (this.paymentAddForm.valid) {
      this.paymentAddForm.get('userId')?.setValue(this.customerId);
      this.paymentWait = true;
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.payment(paymentModel).subscribe(
        (response) => {
          this.paymentSuccess = response.successStatus;
          this.paymentWait = false;
          if (this.paymentSuccess) {
            this.paymentError = false;
            this.toastr.success(response.message);
            this.addRental();
            console.log(this.creditCardId);
            if (this.cardExits() == false) {
              this.cardSaveModal.nativeElement.click();
            }            
          } else {
            this.toastr.error(response.message);
            this.paymentError = true;
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
            this.paymentError = true;
            this.paymentWait = false;
          }
        }
      );
    } else {
      this.toastr.error('Form Hatalı');
    }
  }

  creditCardAdd() {
    if (this.paymentAddForm.valid) {
      let cardModel = Object.assign({}, this.paymentAddForm.value);
      this.creditCardService.add(cardModel).subscribe(
        (response) => {
          if (response.successStatus) {
            this.toastr.success(response.message);
            this.cardSaveModalClose.nativeElement.click();
          } else {
            this.toastr.error(response.message);
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastr.error('Form Hatalı');
    }
  }

  addRental() {
    if (localStorage.getItem('payment-data') != null) {
      let rentalModel = Object.assign(
        {},
        JSON.parse(localStorage.getItem('payment-data') || '{}')
      );

      this.rentalService.add(rentalModel).subscribe(
        (response) => {
          this.toastr.success(response.message);
          localStorage.removeItem('payment-data');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    }
  }

  cardChange(event: any) {
    let selectedCard = this.creditCards.find((c) => c.id == this.creditCardId);
    this.paymentAddForm.get('nameOnCard')?.setValue(selectedCard?.nameOnCard);
    this.paymentAddForm.get('cardNumber')?.setValue(selectedCard?.cardNumber);
    this.paymentAddForm
      .get('cardMonth')
      ?.setValue(selectedCard?.cardMonth);
    this.paymentAddForm
      .get('cardYear')
      ?.setValue(selectedCard?.cardYear);
    this.paymentAddForm.get('cvv')?.setValue(selectedCard?.cvv);
  }

  cardExits() {
    let card = this.creditCards.find((c) => c.cardNumber == this.cardNumber);
    if (card === undefined) {
      return false;
    }
    return true;
  }
}