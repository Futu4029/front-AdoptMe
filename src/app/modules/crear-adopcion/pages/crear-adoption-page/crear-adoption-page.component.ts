import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdoptionService} from "@service/adoption-service";

@Component({
  selector: 'app-crear-adoption-page',
  templateUrl: './crear-adoption-page.component.html',
  styleUrls: ['./crear-adoption-page.component.css']
})
export class CrearAdoptionPageComponent implements OnInit {
  adoptionForm: FormGroup;

  constructor(private fb: FormBuilder, private adoptionService: AdoptionService) {
    this.adoptionForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      size: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      color: [''],
      breed: [''],
      description: ['']
    });
  }
  ngOnInit(): void {
    console.log('CrearAdoptionPageComponent ngOnInit');
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.adoptionForm.patchValue({
        image: file
      });
      this.adoptionForm.get('image')?.updateValueAndValidity();
    }
  }
  onSubmit(): void {
    if (this.adoptionForm.valid) {
      const formData = new FormData();
      Object.keys(this.adoptionForm.value).forEach(key => {
        formData.append(key, this.adoptionForm.value[key]);
      });

      // Llama al servicio para enviar los datos
      this.adoptionService.createAdoption(formData).subscribe(
        response => {
          // Manejar la respuesta del servicio (por ejemplo, mostrar un mensaje)
          console.log('Adopción creada con éxito', response);
        },
        error => {
          // Manejar el error
          console.error('Error al crear la adopción', error);
        }
      );
    }
  }

}
