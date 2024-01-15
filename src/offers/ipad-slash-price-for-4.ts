import { EligibleOffer } from "../interface/offers.interface";
import { CheckoutOrder } from "../interface/checkout.interface";

// offer method for the bulk discount applicable on buying iPads
export function ipadSlashPriceOfferMethod(
  checkout: CheckoutOrder
): EligibleOffer {
  const eligibleOffer: EligibleOffer = {
    finalPrice: checkout.items.ipd.originalAmount,
    billableQuantity: checkout.items.ipd.quantity,
  };

  // Slash price if buying in bulk
  if (checkout.items.ipd.quantity > 4) {
    eligibleOffer.finalPrice = 499.99;
  }

  return eligibleOffer;
}
