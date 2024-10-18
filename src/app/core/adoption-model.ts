
export interface Pet {
    name: string;
    age: number;
    type: string;
    size: string;
    color: string;
    breed: string;
    gender: string;
    image: string | null;
    description: string;
    adoptionId: string;
  }



  export interface User {
    email: string;
    name: string;
    surName: string;
    locality: string;
    province: string;
  }

  export interface Adoption {
    id: number;
    adopterUser: User;
    pet: Pet;
    owner: User;
    status: string;
  }

  export enum PetType {
    DOG = 'DOG',
    CAT = 'CAT'
  }

  export enum PetAge {
    PUPPY ='PUPPY',
    YOUNG = 'YOUNG',
    ADULT = 'ADULT'
  }
  export enum PetSize {
    SMALL  = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE  ='LARGE'
  }

export interface GeneralResponse {
  message: string;
  data: any;
}
