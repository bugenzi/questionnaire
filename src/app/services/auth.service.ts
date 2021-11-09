import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Ilogin } from '../models/login.model';
import { Register } from '../models/register';
import { IRegister } from '../models/register.model';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private REST_API_SERVER = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {}
    public sendUserRegister(userRegister: IRegister) {
        let registerData: IRegister = new Register();
        registerData = userRegister;
        return this.httpClient.post(this.REST_API_SERVER + '/user', registerData);
    }
    public getUserLogin(userLogin: Ilogin) {
        let loginData: Ilogin = new Login();
        loginData = userLogin;
        let test = this.httpClient.get(this.REST_API_SERVER + '/user');
        console.log(test);
        return test;
    }
}
