import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ilogin } from '../models/login.model';
import { Register } from '../models/register';
import { IRegister } from '../models/register.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser!: Observable<User>;

    private REST_API_SERVER = environment.REST_API_SERVER;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('currentUser') || null!),
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public sendUserRegister(userRegister: IRegister) {
        let registerData = new Register();

        registerData = { ...userRegister, posts: [] };
        return this.httpClient.post(this.REST_API_SERVER + '/user', registerData);
    }

    login(loginCred: any) {
        return this.httpClient.get<any>(this.REST_API_SERVER + '/user').pipe(
            map((res: any) => {
                let user = res.find(
                    (val: Ilogin) =>
                        val.email === loginCred.email && val.password === loginCred.password,
                );

                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                } else {
                    this.currentUserSubject.next(null!);
                }

                return user;
            }),
        );
    }
    getUserById(id: string) {
        let params = new HttpParams();
        params = params.append('id', id);

        return this.httpClient.get<any>(this.REST_API_SERVER + '/user', { params }).pipe();
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
}
