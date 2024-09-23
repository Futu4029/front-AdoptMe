import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private baseUrl = 'http://localhost:8085/adoption';

  constructor(private http: HttpClient) {}


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

    const url = `${this.baseUrl}/search`;
    console.log(url + '?' + params.toString());

    return this.http.get<any>(url, { params });

}

  createAdoption(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }
}
