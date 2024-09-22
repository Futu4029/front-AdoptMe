import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-crear-adoption-page',
  templateUrl: './crear-adoption-page.component.html',
  styleUrls: ['./crear-adoption-page.component.css']
})
export class CrearAdoptionPageComponent implements OnInit {
  adoptionForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

}
