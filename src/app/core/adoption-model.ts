
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

  export interface Owner {
    email: string;
    name: string;
    surName: string;
    locality: string;
    province: string;
  }

  export interface Adoption {
    id: number;
    adopterUser: Owner;
    pet: Pet;
    owner: Owner;
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
