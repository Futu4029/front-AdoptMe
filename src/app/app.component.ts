import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { AuthService } from '@modules/auth/Service/auth.service';
import { ApiRestService } from '@service/apiRestService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adopt-me';
  private readonly VAPID_PUBLIC_KEY = 'BM3tH-xTaH4xUekOt34I9RkfkwOD2_hj_jtTG1KjtXcBSYtOURtjK2Ao0q48v74tCowwG8Y7kHvv4nSHwogqo1c';

  constructor(
    public authService: AuthService,
    private swPush: SwPush,
    private apiRest: ApiRestService
  ) {
    this.subscribeToNotifications();
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


}
