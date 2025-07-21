export interface RegisterFormValues {
  title: string;
  description: string;
  price: string;
  startTime: string;
  endTime: string;
}

export interface RegisterFormErrors {
  title: boolean;
  description: boolean;
  price: boolean;
  startTime: boolean;
  endTime: boolean;
  timeOrderInvalid: boolean;
}
