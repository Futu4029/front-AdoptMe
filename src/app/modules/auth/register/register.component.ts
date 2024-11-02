import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../Service/register';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  imagePreview: string | null = null;
  map: L.Map | null = null;
  marker: L.Marker | null = null;
  options: any;
  selectedCoords: { lat: number; lng: number } | null = null;

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
      telefono: ['', Validators.required],
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
      compromiseAccepted: [false, Validators.requiredTrue],
      localization:{
        latitude: ['', Validators.required],
        longitude: ['', Validators.required]}
    });
  }

  ngOnInit(): void {
    console.log('RegisterComponent ngOnInit');

    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        })
      ],
      zoom: 10,
      center: L.latLng([-34.72418, -58.25265]) // Coordenadas iniciales
    };
  }

  onMapClick(event: L.LeafletMouseEvent): void {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    const icon = L.icon({
      iconUrl: 'assets/icon.png', // Ruta a tu imagen de marcador
      iconSize: [50, 30], // Tamaño del icono

    });

    console.log(`Clicked location: Latitude: ${lat}, Longitude: ${lng}`);

    if (this.marker) {
      this.map?.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng], { icon }).addTo(this.map!);
    this.registerForm.patchValue({
      localization: {
        latitude: lat,
        longitude: lng
      }
    });
    this.selectedCoords = { lat, lng };
  }

  onMapReady(map: L.Map): void {
    this.map = map;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;
        this.imagePreview = base64Image;

        this.registerForm.patchValue({
          image: base64Image
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {

    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value;
      console.log(`Formualrio:`, registerRequest);
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

    const fileInput = document.getElementById('file-upload') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }

    this.imagePreview = null;

    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.setErrors(null);
    });


  }
}
