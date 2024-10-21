
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



export interface UserResponse {
  name: string;
  surName: string;
  locality: string;
  province: string;
  livesOnHouse: boolean;
  isPropertyOwner: boolean;
  canHavePetsOnProperty: boolean;
  haveAnyPetsCastrated: boolean;
  whatToDoIfHolydays: string;
  whatToDoIfMoving: string;
  compromiseAccepted: boolean;
}


export interface Adoption {
    id: number;
    adopterUser: UserResponse;
    pet: Pet;
    owner: UserResponse;
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
