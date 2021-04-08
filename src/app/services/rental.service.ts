  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponeModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetails';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="http://localhost:5000/api/rentals/"

  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "getalldetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  
  getRentalCarControl(carId: number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "getcarcontrol?carId="+carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addrental",rental);
  }
}
