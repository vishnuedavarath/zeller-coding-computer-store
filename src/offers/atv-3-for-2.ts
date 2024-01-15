import { CheckoutOrder } from "../interface/checkout.interface";
import { EligibleOffer } from "../interface/offers.interface";

// offer method for the buy 2 get 1 free offer for Apple TVs
export function atv3For2OfferMethod(checkout: CheckoutOrder): EligibleOffer {
  const eligibleOffer: EligibleOffer = {
    finalPrice: checkout.items.atv.originalAmount,
    billableQuantity: checkout.items.atv.quantity,
    extras: {},
  };

  // Number of Apple TVs eligible to get for free in the scanned items
  let eligibleExtras = Math.floor(checkout.items.atv.quantity / 3);

  // Number of additional ATVs scanned which is not included in the 3 for 2 group
  const additionalAtvs = checkout.items.atv.quantity % 3;

  // Billable quantity of ATVs in the scanned items
  eligibleOffer.billableQuantity = eligibleExtras * 2 + additionalAtvs;

  // If extra ATVs are eligible by the additional ATVs scanned which is not included in the 3 for 2 group
  if (additionalAtvs === 2) eligibleExtras++;

  eligibleOffer.extras = {
    atv: {
      quantity: eligibleExtras,
      price: 0,
    },
  };

  return eligibleOffer;
}
