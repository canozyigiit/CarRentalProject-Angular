import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl="http://localhost:5000/api/findeks/"
  
  constructor(private httpClient: HttpClient) {}

  check(carId: number,customerId:number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiUrl + 'check?carId=' + carId + '&customerId=' + customerId);
  }
}
