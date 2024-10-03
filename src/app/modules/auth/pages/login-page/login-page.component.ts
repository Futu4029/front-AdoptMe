import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "@modules/auth/Service/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorSession: boolean = false
  formLogin: FormGroup= new FormGroup({});

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit(): void {
    if (this.formLogin.invalid) {
      return;
    }

    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe(
      responseOk => {
        console.log('Sesión iniciada correctamente', responseOk);

        const { tokenSession, data } = responseOk;

        // Guardamos el token en el localStorage o en un servicio de sesión
        localStorage.setItem('tokenSession', tokenSession);

        // Redirigimos al usuario a la página de inicio
        this.router.navigate(['/']);
      },
      err => {
        this.errorSession = true;
        console.log('⚠ Ocurrió un error con tu email o password');
      }
    );
  }

}
