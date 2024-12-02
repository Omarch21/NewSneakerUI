import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { LoginRequest } from "../models/loginRequest";
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    isUserLoggedIn: boolean = false;
    constructor(public http: HttpClient){
    }


    RegisterUser(user: User): Observable<any>{
        const url = 'https://localhost:7017/api/User/register';
        return this.http.post(url,{username: user.username, password: user.password}, {withCredentials: true});
    }
    
    loginUser(user: LoginRequest): Observable<string>{
        const url = 'https://localhost:7017/api/User/login'
        return this.http.post(url,{username: user.email, password: user.password}, {responseType: 'text', withCredentials: true}).pipe(
            tap((data:any)=>{
                localStorage.setItem("accessToken",data);
            })
        )
    }

    logoutUser(): Observable<any>{
        const url = 'https://localhost:7017/api/User/logout';
        return this.http.post(url,{}, {withCredentials: true}).pipe(
            tap((data:any)=>{
                localStorage.removeItem('accessToken');
            })
        )
    }
    
    getLoggedInUserData(): Observable<any>{
        const url = 'https://localhost:7017/api/User/GetUserData';
        return this.http.get(url, {withCredentials: true})
    }

    isLoggedIn(): Observable<any> {
        const url = 'https://localhost:7017/api/User/isAuthenticated';
        return this.http.get<boolean>(url, {withCredentials: true}).pipe(
            tap((check)=>{
                console.log(check)
                this.isUserLoggedIn = check;
            })
        )
    }

    getUserLoggedIn(): Observable<boolean>{
        return of(this.isUserLoggedIn);
    }

    getAccessToken(): string | null{
        return localStorage.getItem('accessToken');
    }

    refreshAccessToken():Observable<string>{
        const url = 'https://localhost:7017/api/User/refresh-token';
        return this.http.post(url,{},{withCredentials: true, responseType: 'text'}).pipe(
            tap((token:any)=>{
                localStorage.setItem('accessToken',token);
            })
        );
    }
}