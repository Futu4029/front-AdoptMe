import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdoptionService } from '@service/adoption-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-adoption-page',
  templateUrl: './crear-adoption-page.component.html',
  styleUrls: ['./crear-adoption-page.component.css']
})
export class CrearAdoptionPageComponent implements OnInit {
  adoptionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private snackBar: MatSnackBar
  ) {
    this.adoptionForm = this.fb.group({
      petDto: this.fb.group({
        name: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
        type: ['', Validators.required],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        images: [[], [Validators.required, this.maxImagesValidator(5)]], // Validación para máximo de 5 imágenes
        color: [''],
        breed: [''],
        description: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    console.log('CrearAdoptionPageComponent ngOnInit');
  }

  maxImagesValidator(max: number) {
    return (control: any) => {
      const files = control.value as string[] | null;
      return files && files.length > max ? { maxLength: true } : null;
    };
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files).slice(0, 5); // Limitar a 5 archivos
      const base64Images: string[] = [];

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          base64Images.push(reader.result as string);

          if (index === files.length - 1) {
            this.adoptionForm.patchValue({
              petDto: { images: base64Images }
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit(): void {
    this.markAllControlsAsTouched(this.adoptionForm);

    if (this.adoptionForm.valid) {
      const adoptionRequest = this.adoptionForm.value;
      this.resetForm();

      console.log('Request enviado al servicio:', adoptionRequest);

      this.adoptionService.createAdoption(adoptionRequest).subscribe(
        response => {
          this.snackBar.open('Adopción creada correctamente', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error => {
          this.snackBar.open('Error al crear la adopción', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  resetForm(): void {
    this.adoptionForm.reset();
    this.adoptionForm.markAsPristine();
    this.adoptionForm.markAsUntouched();
    this.adoptionForm.updateValueAndValidity();

    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // Limpia errores en cada campo
    Object.keys(this.adoptionForm.controls).forEach(key => {
      const control = this.adoptionForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(innerKey => {
          const innerControl = control.get(innerKey);
          innerControl?.setErrors(null);
        });
      } else {
        control?.setErrors(null);
      }
    });
  }

  markAllControlsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markAllControlsAsTouched(control); // Recursivo para controles anidados
      } else if (control instanceof FormArray) {
        control.controls.forEach(ctrl => this.markAllControlsAsTouched(ctrl as FormGroup));
      } else {
        // @ts-ignore
        control.markAsTouched();
      }
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput.click();
  }
}
