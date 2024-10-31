import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdoptionService } from '@service/adoption-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-adoption-page',
  templateUrl: './crear-adoption-page.component.html',
  styleUrls: ['./crear-adoption-page.component.css']
})
export class CrearAdoptionPageComponent implements OnInit {
  adoptionForm: FormGroup;
  zoom: number = 8; // Ajusta el nivel de zoom según sea necesario
  center: google.maps.LatLngLiteral = {lat: -34.6037, lng: -58.3816}; // Coordenadas por defecto (Buenos Aires)
  markerPosition: google.maps.LatLngLiteral = this.center; // Posición del marcador
  markerLabel: string = 'Ubicación seleccionada';

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
        location: this.fb.group({
          latitude: [null],
          longitude: [null]
        }),
        images: [[], [Validators.required, this.maxImagesValidator(5)]], // Validación para máximo de 5 imágenes
        color: [''],
        breed: [''],
        description: ['', Validators.required],

      })
    });
  }

  ngOnInit(): void {
    console.log('CrearAdoptionPageComponent ngOnInit');
  }

  maxImagesValidator(max: number) {
    return (control: any) => {
      const files = control.value as string[] | null;
      return files && files.length > max ? {maxLength: true} : null;
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
              petDto: {images: base64Images}
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit(): void {
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

  setLocation(event: google.maps.MouseEvent): void {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat !== undefined && lng !== undefined) {
      this.markerPosition = {lat, lng};

      // Actualiza el FormGroup con las coordenadas
      this.adoptionForm.patchValue({
        petDto: {
          location: {
            latitude: lat,
            longitude: lng
          }
        }
      });
    }
  }

}
