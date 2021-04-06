import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponeModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = ' http://localhost:5000/api/Customers/';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    let newPath =this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }
  getCustomersById(customerId:number):Observable<SingleResponseModel<Customer>> {
    let newPath =this.apiUrl+"getbyid?customerId="+customerId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
}
