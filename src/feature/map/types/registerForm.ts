export interface RegisterFormValues {
  title: string;
  description: string;
  price: string;
  startTime: string;
  endTime: string;
  address: string;
}

export interface RegisterFormErrors {
  title: boolean;
  description: boolean;
  price: boolean;
  startTime: boolean;
  endTime: boolean;
  timeOrderInvalid: boolean;
}

export interface RegisterFormData extends RegisterFormValues {
  lat: number;
  lng: number;
}
