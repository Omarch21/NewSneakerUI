import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Sneaker } from "../../../models/sneaker";
@Injectable({
    providedIn: 'root'
})
export class NewsService{
  
    constructor(public http: HttpClient){
    }

    getNews(): Observable<any>{
        const url = 'https://localhost:7017/api/News'
        return this.http.get(url);
    }

    getReleases(): Observable<any>{
        const url = 'https://localhost:7017/api/SneakerReleases'
        return this.http.get(url);
    }
}