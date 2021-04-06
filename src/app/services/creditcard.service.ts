import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponeModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {
  apiUrl = ' http://localhost:5000/api/usercreditcards/';

  constructor(private httpClient :HttpClient) { }

  add(card: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', card);
  }

  getCardByUserId(userId:number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiUrl + 'getbyid?userId='+userId);
  }  

  getAllCustomerCardId(customerId:number): Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl + 'getallbyid?customerId='+customerId);
  }
}
