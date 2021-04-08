
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  editProfileForm: FormGroup;
  editCustomerFrom: FormGroup;
  password: FormControl;
  email: string;
  user: User;
  customer: Customer;

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProfileAddForm();
    this.createCustomerAddForm()
    this.user = this.localStorageService.getItem('user');
    this.email = this.localStorageService.getItem('email');
    this.getUser();
    this.getCustomer();
  }

  createProfileAddForm() {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createCustomerAddForm() {
    this.editCustomerFrom = this.formBuilder.group({
      companyName: ['', Validators.required],
    });
  }

  getUser() {
    if (this.user) {
      this.userService.getUserById(this.user.id).subscribe(
        (response) => {
         
          this.user = response.data;
          this.editProfileForm.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: '',
          });
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  updateProfil() {
    if (this.editProfileForm.valid) {
      let profileModel = Object.assign({}, this.editProfileForm.value);
      profileModel.id = this.user.id;
      this.userService.update(profileModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Hata');
    }
  }
  logOut() {
    this.localStorageService.clean();
    this.router.navigate(['/']);
  }

  getCustomer() {
    this.customerService.getCustomerByUserId(this.user.id).subscribe(
      (response) => {
        console.log(response)
        this.customer = response.data;
        this.editCustomerFrom.setValue({
          companyName: this.customer.companyName,
        });
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }
  userCustomerCheck(){
    if (this.customer==null) {
      return false
    } else {
      return true
    }
  }
  updateCustomer() {
    if (this.editCustomerFrom.valid) {
      let customerModel = Object.assign({}, this.editCustomerFrom.value);
      customerModel.customerId = this.customer.customerId;
      customerModel.findexScore=this.customer.findexScore;
      customerModel.userId=this.customer.userId
      this.customerService.update(customerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Hata');
    }
  }
  refresh(){
    window.location.reload();
   }
}
