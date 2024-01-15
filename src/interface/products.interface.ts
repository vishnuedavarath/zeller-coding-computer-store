export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Catalogue {
  [key: string]: Product;
}
