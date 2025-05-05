import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Sneaker } from "../../../models/sneaker";
@Injectable({
    providedIn: 'root'
})
export class SneakerService{
  
    constructor(public http: HttpClient){
    }

    /*addSneaker(){
        const url = 'https://localhost:7017/api/Sneakerhttps://localhost:7017/api/Sneaker';
    }*/
    searchSneakerOnline(search: string): Observable<any>{
        const url = 'https://localhost:7017/api/User/Sneaker';
        return this.http.post(url,{search},{withCredentials: true});
    }
    getSneakersByUserId(userId: number): Observable<Sneaker[]>{
        const url = 'https://localhost:7017/api/Sneaker/GetSneakersByUserId';
        return this.http.post<Sneaker[]>(url,userId);
    }
    addSneaker(sneaker: Sneaker): Observable<boolean>{
        const url = "https://localhost:7017/api/Sneaker/AddSneaker";
        return this.http.post<boolean>(url, sneaker);
    }
    getSneakerById(id: string): Observable<Sneaker>{
        const url = `https://localhost:7017/api/Sneaker/${id}`;
        return this.http.get<Sneaker>(url);
    }
    get1More(sneaker:any): Observable<any>{
        const url = `https://localhost:7017/api/User/info`;
        return this.http.post(url,sneaker);
    }
    deleteSneaker(id:number): Observable<Sneaker[]>{
        const url = `https://localhost:7017/api/Sneaker/${id}`;
        return this.http.delete<Sneaker[]>(url);
    }
    updateSneaker(sneaker: Sneaker): Observable<Sneaker[]>{
        const url = 'https://localhost:7017/api/Sneaker'
        return this.http.put<Sneaker[]>(url,sneaker);
    }
    getSneakerPricesById(id:number): Observable<any>{
        const url = `https://localhost:7017/api/SneakerPriceHistories/${id}`
        return this.http.get<any>(url);
    }
}