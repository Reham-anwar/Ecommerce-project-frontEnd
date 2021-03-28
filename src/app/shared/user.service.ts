import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { User } from './user.model';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ NgForm, FormControl, FormGroup, Validators }from '@angular/forms'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser : User = {
    name:'',
    email:'',
    password:'',
    gender:'',
    userImage:'',
    userType:1
  }
  avatar;
  sendImg(e){
    this.avatar=e;
  }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }


  //HttpMethods

  postUser(user: User){
    // let namea = selectedUser.name;
    const data=new FormData();
    data.append("name",this.selectedUser.name);
    data.append("email",this.selectedUser.email);
    data.append("password",this.selectedUser.password);
    data.append("gender",this.selectedUser.gender);
    data.append("userImage",this.avatar);
      return this.http.post(environment.apiBaseUrl+'/register',data,this.noAuthHeader);
    }
  

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  userType;
  getUserType(_userType){
    this.userType=_userType;
     console.log(this.userType);

  }
//   userId;
// getUserId(_UserId){
// this.userId = _UserId;
// }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  editUserProfile(name:any,email:any) {
   const body={
    name:name,
    email:email
   }
    return this.http.patch(environment.apiBaseUrl + '/editProfile',body);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }



}
