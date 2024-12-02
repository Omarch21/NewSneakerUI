import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class ShoeService{
  
    constructor(public http: HttpClient){
    }

    addSneaker(){
        const url = 'https://localhost:7017/api/Sneakerhttps://localhost:7017/api/Sneaker';
        
    }
}