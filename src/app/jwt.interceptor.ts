import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // URLs que no deben llevar el token
    const excludeUrls = ['/auth/login', '/auth/logout', '/auth/register'];

    // Si la URL de la request está dentro de las excluidas, continúa sin modificar la request
    if (excludeUrls.some(url => request.url.includes(url))) {
      return next.handle(request);
    }

    const token = localStorage.getItem('tokenSession');

    if (token) {
      console.log('Token agregado:', token);
      // Clonar la request para agregar el header Authorization con el token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
