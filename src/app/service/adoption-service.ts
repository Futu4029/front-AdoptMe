import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
