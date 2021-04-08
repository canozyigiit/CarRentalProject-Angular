import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/add-components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/update-components/brand-update/brand-update.component';
import { CarAddComponent } from './components/add-components/car-add/car-add.component';
import { CarUpdateComponent } from './components/update-components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/add-components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/update-components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/detail/:carId', component: CardetailComponent },
  { path: 'detail/:carId', component: CardetailComponent },
  { path: 'rental/:carId', component: RentalComponent },
  { path: 'cars/filterBrand/:brandId', component: CarComponent },
  { path: 'cars/filterColor/:colorId', component: CarComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },

  { path: 'rentals', component: RentalListComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'payment', component: PaymentComponent },

  { path: 'cars/add', component: CarAddComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors/add', component: ColorAddComponent },

  { path: 'editBrands', component: BrandUpdateComponent },
  { path: 'editColors', component: ColorUpdateComponent },
  { path: 'editCars', component: CarUpdateComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
