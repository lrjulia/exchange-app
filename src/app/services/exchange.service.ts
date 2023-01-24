import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private apiURL = "https://api.exchangerate.host";

  constructor(private http: HttpClient) { }

  getLatestExchange(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/latest");
  }

  getSymbols(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/symbols");
  }

  convert(from: String, to: String, amount: number): Observable<any> {
    return this.http.get<any>(this.apiURL + "/convert?from=" + from + "&to=" + to + "&amount=" + amount);
  }
}
