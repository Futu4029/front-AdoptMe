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
      petDto: this.fb.group({
        name: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
        type: ['', Validators.required],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        image: ['', Validators.required], // Asumido para simplificar
        color: [''],
        breed: [''],
        description: ['']
      }),
      userId: ['2']
    });
  }
  ngOnInit(): void {
    console.log('CrearAdoptionPageComponent ngOnInit');
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;
        this.adoptionForm.patchValue({
          petDto: {
            image: base64Image // Enviar la imagen en formato Base64
          }
        });
      };
      reader.readAsDataURL(file); // Convierte el archivo en Base64
    }
  }
  onSubmit(): void {
    if (this.adoptionForm.valid) {
      const adoptionRequest = this.adoptionForm.value;


      console.log('form', this.adoptionForm);
      console.log('formValue', adoptionRequest);
      // Llama al servicio para enviar los datos
      this.adoptionService.createAdoption(adoptionRequest).subscribe(
        response => {
          // Manejar la respuesta del servicio (por ejemplo, mostrar un mensaje)
          console.log('Adopción creada con éxito', response);
        },
        error => {
          // Manejar el error
          console.error('Error al crear la adopción', error);
        }
      );
    }else {
      console.error('Formulario inválido');
    }
  }

}
