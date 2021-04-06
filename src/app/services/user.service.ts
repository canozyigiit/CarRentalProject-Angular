import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:5000/api/users/';

  constructor(private httpClient:HttpClient) { }
 

  update(userUpdateModel: User): Observable<SingleResponseModel<TokenModel>> {
    let updatePath = this.apiUrl + 'edit';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(updatePath, userUpdateModel);
 }
 
 getUserById(userId: number): Observable<SingleResponseModel<User>> {
  let newUrl = this.apiUrl+'getbyid?userId='+userId;
  return this.httpClient.get<SingleResponseModel<User>>(newUrl);
}

  
 getByEmail(email:string):Observable<SingleResponseModel<User>>{
  let newPath = this.apiUrl+'getbyemail?email='+email;
  return this.httpClient.get<SingleResponseModel<User>>(newPath);
}
  /* getClaims(user:User){
    return this.httpClient.post<ListResponseModel<Claim>>(this.apiUrl+"getclaims",user)
  } */
}