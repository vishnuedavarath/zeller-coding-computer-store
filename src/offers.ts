import { CheckoutOrder } from "./interface/checkout.interface";
import {
  EligibleOffersByProduct,
  Offer,
  OfferMap,
  ProductOfferMapping,
} from "./interface/offers.interface";

export class Offers {
  private offers: OfferMap;
  private offersByProduct: ProductOfferMapping;
  constructor() {
    this.offers = {};
    this.offersByProduct = {};
  }

  // Get all offers
  public getOffers(): OfferMap {
    return this.offers;
  }

  // Get offers applicable for a particular product
  public getOffersByProduct(): ProductOfferMapping {
    return this.offersByProduct;
  }

  // Add a new offer
  public addOffer(offer: Offer) {
    this.offers[offer.id] = offer;

    // Add the offer to offer - product map under listed products
    offer.products.forEach((productId) => {
      if (this.offersByProduct[productId]) {
        this.offersByProduct[productId].push(offer.id);
      } else {
        this.offersByProduct[productId] = [offer.id];
      }
    });
  }

  // find offers eligible by each products for a given order
  /*
   Returns object in the format

   {
        product : [
            {
                finalPrice : 0,
                billableQuantity : 0,
                extras:{
                    quantity: 0,
                    price:0,
                }
            }
        ]
   }

  */
  private findOffers(checkoutOrder: CheckoutOrder): EligibleOffersByProduct {
    const eligibleOffersByProduct: EligibleOffersByProduct = {};
    Object.keys(checkoutOrder.items).forEach((productId) => {
      if (
        !this.offersByProduct[productId] ||
        this.offersByProduct[productId].length === 0
      )
        return;

      eligibleOffersByProduct[productId] = [];
      this.offersByProduct[productId].forEach((offer) => {
        if (
          this.offers[offer] &&
          Object.keys(this.offers[offer]).length !== 0
        ) {
          eligibleOffersByProduct[productId].push(
            this.offers[offer].offerMethod(checkoutOrder)
          );
        }
      });
    });

    return eligibleOffersByProduct;
  }

  // Apply offers those are eligible for each products in the order
  public applyOffers(checkoutOrder: CheckoutOrder) {
    // Find the offers elgible by products for the given order
    const eligibleOffersByProduct: EligibleOffersByProduct =
      this.findOffers(checkoutOrder);

    // Resolve eligible offers on the given order
    // Applies the first eligible offer found for each products
    Object.keys(eligibleOffersByProduct).forEach((product) => {
      checkoutOrder.items[product].finalAmount =
        eligibleOffersByProduct[product][0].finalPrice;

      checkoutOrder.items[product].quantity =
        eligibleOffersByProduct[product][0].billableQuantity;

      if (eligibleOffersByProduct[product][0].extras)
        Object.keys(eligibleOffersByProduct[product][0].extras!).forEach(
          (product) => {
            if (checkoutOrder.items[product].extra) {
              checkoutOrder.items[product].extra!.quantity +=
                eligibleOffersByProduct[product][0].extras![product].quantity;

              checkoutOrder.items[product].extra!.price =
                (eligibleOffersByProduct[product][0].extras![product].quantity *
                  eligibleOffersByProduct[product][0].extras![product].price) /
                checkoutOrder.items[product].extra!.quantity;
            } else {
              checkoutOrder.items[product].extra = {
                quantity:
                  eligibleOffersByProduct[product][0].extras![product].quantity,
                price:
                  eligibleOffersByProduct[product][0].extras![product].price,
              };
            }
          }
        );
    });

    let totalValue = 0;

    // Resolve final price of the order after applying offers on all the products
    totalValue = Object.keys(checkoutOrder.items).reduce(
      (totalValue, product) => {
        totalValue +=
          checkoutOrder.items[product].finalAmount *
            checkoutOrder.items[product].quantity +
          (checkoutOrder.items[product].extra?.price || 0) *
            (checkoutOrder.items[product].extra?.quantity || 0);

        return totalValue;
      },
      totalValue
    );

    checkoutOrder.finalValue = totalValue;

    return checkoutOrder;
  }
}
