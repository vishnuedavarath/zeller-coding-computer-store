import { CheckoutOrder } from "./checkout.interface";

export interface Offer {
  id: string;
  products: string[];
  offerMethod(checkout: CheckoutOrder): EligibleOffer;
}

export interface OfferMap {
  [key: string]: Offer;
}

export interface ProductOfferMapping {
  [key: string]: string[];
}

export interface OfferConditions {
  offerProduct: string;
  minQuantity?: number;
  minPrice?: number;
  percentageOff?: number;
  flatOff?: number;
  slashPrice?: number;
  freeProduct?: string;
}

export interface EligibleOffersByProduct {
  [key: string]: EligibleOffer[];
}

export interface EligibleOffer {
  finalPrice: number;
  billableQuantity: number;
  extras?: ExtraProductOfferMapping;
}

export interface ExtraProductOffer {
  quantity: number;
  price: number;
}

export interface ExtraProductOfferMapping {
  [key: string]: ExtraProductOffer;
}
