import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Sneaker } from "../../../models/sneaker";
import { environment } from "../../../../environments/environment.prod";
@Injectable({
    providedIn: 'root'
})
export class NewsService{
    private url = environment.apiUrl;
    constructor(public http: HttpClient){
    }

    getNews(): Observable<any>{
        const url = `${this.url}/api/News`
        return this.http.get(url);
    }

    getReleases(): Observable<any>{
        const url = `${this.url}/api/SneakerReleases`
        return this.http.get(url);
    }
}