import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.localStorageService.setItem("token",response.data.token);       
        this.getUserByEmail(loginModel.email);
        this.toastr.info(response.message)
        this.router.navigate(['/'])
      },responseError=>{
        console.log(responseError)
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.warning("Hatalı giriş");
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
       this.user = response.data;
       this.localStorageService.setItem("user",this.user);
       this.localStorageService.setItem("email",this.user.email)
    });
 }



}
