import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterUser } from "../models/registerUser";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap, throwError } from "rxjs";
import { LoginRequest } from "../models/loginRequest";
import { User } from "../../../models/user";
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private isLoggedInSubject= new BehaviorSubject<boolean>(false);
    private isLoggedInSubject2= new BehaviorSubject<boolean>(false);
    constructor(public http: HttpClient){
    }


    RegisterUser(user: RegisterUser): Observable<any>{
        const url = 'https://localhost:7017/api/User/register';
        return this.http.post(url,{username: user.username, password: user.password}, {withCredentials: true});
    }
    
    loginUser(user: LoginRequest): Observable<string>{
        const url = 'https://localhost:7017/api/User/login'
        return this.http.post(url,{username: user.email, password: user.password}, {responseType: 'text', withCredentials: true}).pipe(
            tap((data:any)=>{
                localStorage.setItem("accessToken",data);
                this.isLoggedInSubject.next(true)
            })
        )
    }

    logoutUser(): Observable<any>{
        const url = 'https://localhost:7017/api/User/logout';
        return this.http.post(url,{}, {withCredentials: true}).pipe(
            tap((data:any)=>{
                localStorage.removeItem('accessToken');
                this.isLoggedInSubject.next(false)
            })
        )
    }
    
    getLoggedInUserData(): Observable<User>{
        const url = 'https://localhost:7017/api/User/GetUserData';
        return this.http.get<User>(url, {withCredentials: true})
    }

    checkLoggedIn(): Observable<boolean> {
        const url = 'https://localhost:7017/api/User/isAuthenticated';
        return this.http.get<boolean>(url, {withCredentials: true}).pipe(
            tap(data=>{
                this.isLoggedInSubject.next(data);
            })
        );
    }

    get isLoggedIn$(): Observable<boolean>{
        return this.isLoggedInSubject.asObservable();
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