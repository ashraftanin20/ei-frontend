import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = 'http://localhost:8000/api';
 
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  async loginService(username: string, password: string): Promise<any> {
    const res = await axios.post(`${this.apiUrl}/login_check`, {
      username: username,
      password: password });
    return res.data ?? [];
  }

  getUserByCode(code: any) {
    return this.http.get(this.apiUrl+'/' + code);
  }

  async registerUser(user: any) {
    const res = await axios.post(`${this.apiUrl}/register`, {
      username: user.username,
      email: user.email,
      password: user.password
    });
    return res.data ?? [];
  }

  updateUser(code: any, user: any) {
    return this.http.put(this.apiUrl + '/' + code, user);
  }

  isUserLoggedIn(){
    return sessionStorage.getItem('token') != null;
    //return true;
  }

  getUserRole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole') : '';
  }
}
