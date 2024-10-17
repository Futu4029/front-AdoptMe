import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private baseUrl = 'http://localhost:8085/adoption';
  private baseUrl2 = 'http://localhost:8085/application';

  constructor(private http: HttpClient) {}

  // Obtener adopción por ID
  getAdoptionsById(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url, {  });
  }

  // Buscar adopciones filtradas
  searchFilteredAdoptions(size?: string, age?: string, type?: string, gender?: string): Observable<any> {
    let params = new HttpParams();

    const filters = { size, age, type, gender };

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    const url = `${this.baseUrl}/search`;

    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  // Crear adopción
  createAdoption(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData, { });
  }

  applyToAdoption(adoptionRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl2}`,adoptionRequest ,{ });
  }

  blackListAdoption(adoptionRequest: any): Observable<any> {
    return this.http.put(`${this.baseUrl2}`,adoptionRequest ,{ });
  }



}
