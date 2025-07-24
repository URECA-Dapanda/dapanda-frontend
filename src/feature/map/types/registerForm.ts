export interface RegisterFormValues {
  title: string;
  description: string;
  price: string;
  address: string;
  startTime: string;
  endTime: string;
  latitude?: number;
  longitude?: number;
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
