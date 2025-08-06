export interface RegisterFormValues {
  title: string;
  description: string;
  price: string;
  address: string;
  startTime: string;
  endTime: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
}

export interface RegisterFormData extends RegisterFormValues {
  lat: number;
  lng: number;
}

export interface RegisterFormErrors {
  title: boolean;
  description: boolean;
  price: boolean;
  startTime: boolean;
  endTime: boolean;
  timeOrderInvalid: boolean;
}

export interface WifiRegisterRequest {
  price: number;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  address: string;
  images: string[];
}

export interface WifiUpdateRequest {
  productId: number;
  price: number;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  address: string;
  startTime: string;
  endTime: string;
  imageUrls: string[];
}
