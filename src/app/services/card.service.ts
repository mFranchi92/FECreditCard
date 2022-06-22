import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private myAppUrl = 'https://localhost:7163/';
  private myApiUrl = 'api/cards/'

  constructor(private http: HttpClient) { }

  getCardList(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveCard(card: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, card);
  }

  updateCard(id: number, card: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, card);
  }
}
