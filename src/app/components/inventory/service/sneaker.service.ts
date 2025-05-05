import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Sneaker } from "../../../models/sneaker";
import { environment } from "../../../../environments/environment.prod";
@Injectable({
    providedIn: 'root'
})
export class SneakerService{
    private url = environment.apiUrl;
    constructor(public http: HttpClient){
    }

    /*addSneaker(){
        const url = 'https://localhost:7017/api/Sneakerhttps://localhost:7017/api/Sneaker';
    }*/
    searchSneakerOnline(search: string): Observable<any>{
        const url = `${this.url}/api/User/Sneaker`;
        return this.http.post(url,{search},{withCredentials: true});
    }
    getSneakersByUserId(userId: number): Observable<Sneaker[]>{
        const url = `${this.url}/api/Sneaker/GetSneakersByUserId`;
        return this.http.post<Sneaker[]>(url,userId);
    }
    addSneaker(sneaker: Sneaker): Observable<boolean>{
        const url = `${this.url}/api/Sneaker/AddSneaker`;
        return this.http.post<boolean>(url, sneaker);
    }
    getSneakerById(id: string): Observable<Sneaker>{
        const url = `${this.url}/api/Sneaker/${id}`;
        return this.http.get<Sneaker>(url);
    }
    get1More(sneaker:any): Observable<any>{
        const url = `${this.url}/api/User/info`;
        return this.http.post(url,sneaker);
    }
    deleteSneaker(id:number): Observable<Sneaker[]>{
        const url = `${this.url}/api/Sneaker/${id}`;
        return this.http.delete<Sneaker[]>(url);
    }
    updateSneaker(sneaker: Sneaker): Observable<Sneaker[]>{
        const url = `${this.url}/api/Sneaker`
        return this.http.put<Sneaker[]>(url,sneaker);
    }
    getSneakerPricesById(id:number): Observable<any>{
        const url = `${this.url}/api/SneakerPriceHistories/${id}`
        return this.http.get<any>(url);
    }
}