import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
   brandForm:FormGroup
   addBrandForm:FormGroup
   brands:Brand[]
   currentBrandId?:number
  constructor(private brandService:BrandService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllBrands()
    this.createBrandForm()
  }
  createBrandForm(){
    this.brandForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
    this.addBrandForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
 getAllBrands(){
  this.brandService.getBrands().subscribe(respone=>{
    this.brands=respone.data
  })
 }
 refresh(){
  window.location.reload();
 }

 setCurrentBrandId(brandId?:number){
  this.currentBrandId=brandId
  console.log(this.currentBrandId)
 }

 update(){
  this.brandForm.patchValue({brandId:this.currentBrandId})
  let brandModel:Brand=Object.assign({},this.brandForm.value)
  if(this.brandForm.valid){
    this.brandService.update(brandModel).subscribe(response=>{
      this.toastrService.success("Marka ismi Güncellendi")
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
    this.toastrService.error("Eksik bilgi girdiniz")
  }
 }

 delete(brandName:string,brandId:number){
  let brandToDelete:Brand={brandId:brandId,brandName:brandName}
  this.brandService.delete(brandToDelete).subscribe(response=>{
    this.toastrService.error("Marka silindi.")
  })
 }
}