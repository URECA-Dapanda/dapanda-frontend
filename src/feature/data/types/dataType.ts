export interface DataType {
  id: number;
  userId: number;
  title: string;
  userName: string;
  price: string;
  pricePer: string;
  date: string;
}

export interface ProductItemProps<T> {
  data: T;
}
