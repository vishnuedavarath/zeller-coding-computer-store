export interface CheckoutCart {
  [key: string]: number;
}

export interface CheckoutOrder {
  items: CheckoutItems;
  orderValue: number;
  finalValue: number;
}

export interface CheckoutItems {
  [key: string]: CheckoutProduct;
}

export interface CheckoutProduct {
  productName: string;
  finalAmount: number;
  originalAmount: number;
  quantity: number;
  extra?: CheckoutExtra;
}

export interface CheckoutExtra {
  price: number;
  quantity: number;
}
