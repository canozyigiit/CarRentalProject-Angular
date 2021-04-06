import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorForm:FormGroup
  addColorForm:FormGroup
  colors:Color[]
  currentColorId?:number
 constructor(private colorService:ColorService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

 ngOnInit(): void {
   this.getAllColors()
   this.createColorForm()
 }
 createColorForm(){
   this.colorForm=this.formBuilder.group({
     colorId:["",Validators.required],
     colorName:["",Validators.required]
   })
   this.addColorForm=this.formBuilder.group({
     colorName:["",Validators.required]
   })
 }
getAllColors(){
 this.colorService.getColors().subscribe(respone=>{
   this.colors=respone.data
 })
}
refresh(){
 window.location.reload();
}

setCurrentColorId(colorId?:number){
 this.currentColorId=colorId
 console.log(this.currentColorId)
}

update(){
 this.colorForm.patchValue({colorId:this.currentColorId})
 let colorModel:Color=Object.assign({},this.colorForm.value)
 if(this.colorForm.valid){
   this.colorService.update(colorModel).subscribe(response=>{
     this.toastrService.success("Renk ismi Güncellendi")
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

delete(colorName:string,colorId:number){
 let colorToDelete:Color={colorId:colorId,colorName:colorName}
 this.colorService.delete(colorToDelete).subscribe(response=>{
   this.toastrService.error("Renk silindi")
 })
}

}
