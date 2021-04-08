import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerAddForm:FormGroup
  constructor(private customerService:CustomerService,private formBuilder: FormBuilder,
    private toastrService:ToastrService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createCustomerAddForm()
  }
  createCustomerAddForm() {
    this.customerAddForm=this.formBuilder.group({
      userId:[this.localStorageService.getUser().id,Validators.required],
      companyName:["",Validators.required],
      findexScore:[0,Validators.required],
    })
  }
  add(){
    if(this.customerAddForm.valid){
      let customerModel = Object.assign({},this.customerAddForm.value)
      this.customerService.add(customerModel).subscribe(response=>{     
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
        console.log(responseError.error.Errors)
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }  
      }
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
 
}
