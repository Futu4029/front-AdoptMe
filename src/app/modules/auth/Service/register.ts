import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:8085/auth/register';

  constructor(private http: HttpClient) {}

  createUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData, { });
  }


}
