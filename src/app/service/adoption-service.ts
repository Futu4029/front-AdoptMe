import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private baseUrl = 'http://localhost:8085/adoption'; // Reemplaza con tu URL de backend

  constructor(private http: HttpClient) {}

  // Método para obtener la adopción por ID
  getAdoptionById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  searchFilteredAdoptions(size?: string, age?: string, type?: string, gender?: string): Observable<any> {
    let params = new HttpParams();

    if (size) {
      params = params.append('size', size);
    }

    if (age) {
      params = params.append('age', age);
    }

    if (type) {
      params = params.append('type', type);
    }

    if (gender) {
      params = params.append('gender', gender);
    }
    console.log(this.baseUrl+'/search?');
    console.log(params);

    return this.http.get<any>(this.baseUrl+'/search?', { params });
  }
}
