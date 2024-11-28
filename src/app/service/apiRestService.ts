import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  private URL_BASE = 'http://localhost:8085/notifications/';

  constructor(private http: HttpClient) {}

  saveToken(token: string) {
    return this.http.post(`${this.URL_BASE}save`, {
      token: token
    });
  }
}
