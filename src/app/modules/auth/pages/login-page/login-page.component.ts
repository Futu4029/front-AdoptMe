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
    // Reiniciar el estado del error cada vez que se intenta enviar el formulario
    this.errorSession = false;

    if (this.formLogin.invalid) {
      return;
    }

    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe(
      response => {

        const { data } = response;

        localStorage.setItem('tokenSession', data.accesstoken);


        // Redirigimos al usuario a la página de inicio
        this.router.navigate(['/']);
      },
      err => {
        this.errorSession = true; // Mostramos el error si ocurre
        console.log('⚠ Ocurrió un error con tu email o password');
      }
    );
  }


}
