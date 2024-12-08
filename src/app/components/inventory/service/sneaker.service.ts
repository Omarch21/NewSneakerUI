import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class SneakerService{
  
    constructor(public http: HttpClient){
    }

    addSneaker(){
        const url = 'https://localhost:7017/api/Sneakerhttps://localhost:7017/api/Sneaker';
    }
    searchSneakerOnline(search: string): Observable<any>{
        const url = 'https://localhost:7017/api/User/Sneaker';
        return this.http.post(url,{search},{withCredentials: true});
    }
}