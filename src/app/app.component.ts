import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { AuthService } from '@modules/auth/Service/auth.service';
import { ApiRestService } from '@service/apiRestService';
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adopt-me';
  private readonly VAPID_PUBLIC_KEY = 'BAZs5CHgSH7AcGtIwSEnuLvIyyHJHwT33T6-gIIhKlpSMkhE1REK0UX0oqlBasB81hCpqOalB-yM-th516RG2hE';

  constructor(
    public authService: AuthService,
    private swPush: SwPush,
    private apiRest: ApiRestService,
    private snackBar: MatSnackBar
  ) {
    this.subscribeToNotifications();
    this.listenForMessages();
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        const token = JSON.parse(JSON.stringify(sub));
        //console.log('aca envio el token', token);
        this.apiRest.saveToken(token).subscribe(
          (res: Object) => {
            console.log(res);
          },
          (err) => {
            console.log('ERR', err);
          }
        );
      })
      .catch((err) => console.error('Error en la suscripción:', err));
  }

  listenForMessages() {
    this.swPush.messages.subscribe((message: any) => {
      console.log('Mensaje recibido:', message);


      if (Notification.permission === 'granted') {

        const notification = new Notification('Te llegó una notificación 🎉', {
          body: message.body || 'No hay contenido',
          icon: '/assets/icons/icon-72x72.png', // Ruta a tu icono
        });


        notification.onclick = () => {

          window.open('http://127.0.0.1:4200/', '_self');
        };
      } else if (Notification.permission !== 'denied') {

        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification('Te llegó una notificación 🎉', {
              body: message.body || 'No hay contenido',
              icon: '/assets/icons/icon-72x72.png',
            });

            notification.onclick = () => {

              window.open('http://127.0.0.1:4200/', '_self');
            };
          }
        });
      }
    });
  }

}
