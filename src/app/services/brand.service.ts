import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponeModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = ' http://localhost:5000/api/';
  statusUpdated = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'brands/add', brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"brands/update"
    return this.httpClient.post<ResponseModel>(newUrl,brand)
  }
  delete(brand:Brand):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"brands/delete"
    return this.httpClient.post<ResponseModel>(newUrl,brand)
  }
}
