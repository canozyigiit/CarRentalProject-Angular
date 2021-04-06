import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule}  from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { UserComponent } from './components/user/user.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { from } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { FilterComponent} from './components/filter/filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TotalPricePipe } from './pipes/total-price.pipe';
import { CarAddComponent } from './components/add-components/car-add/car-add.component';
import { BrandAddComponent } from './components/add-components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add-components/color-add/color-add.component';
import { BrandUpdateComponent } from './components/update-components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/update-components/color-update/color-update.component';
import { CarUpdateComponent } from './components/update-components/car-update/car-update.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NaviComponent } from './components/navi/navi.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';



@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    UserComponent,
    RentalComponent,
    CustomerComponent,
    NaviComponent,
    CardetailComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterPipe,
    FilterComponent,
    PaymentComponent,
    TotalPricePipe,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RentalListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor, multi:true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
