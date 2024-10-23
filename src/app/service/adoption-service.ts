import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {UserResponse} from "@core/adoption-model";


@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private adoption = 'http://localhost:8085/adoption';
  private aplication = 'http://localhost:8085/application';
  private user = 'http://localhost:8085/user';
  private aplicationUser = 'http://localhost:8085/application/user';
  private aplicationAdoption = 'http://localhost:8085/application/adoption';

  constructor(private http: HttpClient) {}

  // Obtener adopción por ID
  getAdoptionsById(): Observable<any> {
    return this.http.get<any>(this.adoption, {  });
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

    const url = `${this.adoption}/search`;

    return this.http.get<any>(url, { params }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }

  // Crear adopción
  createAdoption(formData: FormData): Observable<any> {
    return this.http.post(`${this.adoption}`, formData, { });
  }

  applyToAdoption(adoptionRequest: any): Observable<any> {
    return this.http.post(`${this.aplication}`,adoptionRequest ,{ });
  }

  blackListAdoption(adoptionRequest: any): Observable<any> {
    return this.http.put(`${this.aplication}`,adoptionRequest ,{ });
  }

  userProfile(): Observable<any> {
    return this.http.get<any>(this.user);
  }

  getApplicationsByAdoption(adoptionId: any): Observable<any> {
    return this.http.get<any>(`${this.aplicationAdoption+'/'+adoptionId}`);
  }


  getApplicationsByUserId(): Observable<any> {
    return this.http.get<any>(this.aplicationUser);
  }


}
