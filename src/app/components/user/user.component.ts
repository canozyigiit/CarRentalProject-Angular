import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  editProfileForm:FormGroup
  password:FormControl
  email:string;
  user:User;

  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createProfileAddForm();
    this.user = this.localStorageService.getItem("user");
    this.email=this.localStorageService.getItem("email");
    this.getUser();
  }

  createProfileAddForm(){
    this.editProfileForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  getUser(){
      if(this.user){
        this.userService.getUserById(this.user.id).subscribe(response=>{
            this.user = response.data;
            this.editProfileForm.setValue({
              firstName:this.user.firstName,
              lastName:this.user.lastName,
              email:this.user.email,
              password:""
            })
        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      }
  }

  updateProfil(){
    if(this.editProfileForm.valid){
      let profileModel = Object.assign({},this.editProfileForm.value)
      profileModel.id=this.user.id;
      this.userService.update(profileModel).subscribe(response=>{
        this.toastrService.success(response.message);
        this.router.navigate(["/"]);
        this.logOut();
      },responseError=>{
       this.toastrService.error(responseError.error);
      });
    }else{
      this.toastrService.error("Hata")
    }
  }
  logOut(){
    this.localStorageService.clean()
     this.router.navigate(["/"])
   }

}