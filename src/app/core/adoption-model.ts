
export interface Pet {
    id: number;
    name: string;
    age: number;
    type: string;
    size: string;
    color: string;
    breed: string;
    image: string | null;
    description: string;
  }

  export interface User {
    email: string;
    name: string;
    surName: string;
    locality: string;
    province: string;
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
