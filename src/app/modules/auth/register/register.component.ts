import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../Service/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  imagePreview: string | null = null;


  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      locality: ['', Validators.required],
      province: ['', Validators.required],
      image: ['', Validators.required],
      livesOnHouse: [false],
      isPropertyOwner: [false],
      canHavePetsOnProperty: [false],
      haveAnyPetsCastrated: [false],
      whatToDoIfHolydays: ['', Validators.required],
      whatToDoIfMoving: ['', Validators.required],
      compromiseAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    console.log('RegisterComponent ngOnInit');
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;
        this.imagePreview = base64Image; // Mostrar la vista previa de la imagen

        this.registerForm.patchValue({
          image: base64Image // Actualiza el formulario con la imagen en formato Base64
        });
      };

      reader.readAsDataURL(file); // Convierte la imagen en Base64
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value;

      this.registerService.createUser(registerRequest).subscribe(
        response => {
          this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          this.resetForm();

          this.router.navigate(['/auth/login']);
        },
        error => {
          console.error('Error del servidor:', error);
          this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }


  resetForm(): void {
    this.registerForm.reset();
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.updateValueAndValidity();

    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Limpia el campo de archivo
    }

    this.imagePreview = null; // Limpia la vista previa de la imagen

    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.setErrors(null);
    });
  }
}
