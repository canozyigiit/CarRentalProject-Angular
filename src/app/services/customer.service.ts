import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponeModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = ' http://localhost:5000/api/customers/';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    let newPath =this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }
  getCustomersById(customerId:number):Observable<SingleResponseModel<Customer>> {
    let newPath =this.apiUrl+"getbyid?customerId="+customerId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
  getCustomerDetailByUserId(userId:number):Observable<SingleResponseModel<CustomerDetail>>{
    let newPath =this.apiUrl+"getcustomerdetailbyuserid?userId="+userId
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath)
  }
  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath =this.apiUrl+"getcustomerbyuserid?userId="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
  update(customerUpdateModel: Customer): Observable<SingleResponseModel<TokenModel>> {
    let updatePath = this.apiUrl + 'edit';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(updatePath, customerUpdateModel);
 }
 add(customer:Customer):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"add",customer)
}
 
}
