// offers.test.ts
import { CheckoutOrder } from "src/interface/checkout.interface";
import { Offers } from "../src/offers";
import { Offer } from "src/interface/offers.interface";

describe("Offers", () => {
  let offers: Offers;
  let checkoutOrder: CheckoutOrder;

  beforeEach(() => {
    offers = new Offers();
    checkoutOrder = {
      items: {
        ipd: {
          productName: "Super iPad",
          originalAmount: 199,
          finalAmount: 199,
          quantity: 1,
        },
      },
      finalValue: 199,
      orderValue: 199,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should add an offer", () => {
    const offer: Offer = {
      id: "1",
      products: ["product1", "product2"],
      offerMethod: jest.fn(),
    };

    offers.addOffer(offer);

    // Assert that the offer is added to the offers map and offersByProduct
    expect(offers.getOffers()).toHaveProperty("1", offer);
    expect(offers.getOffersByProduct()).toHaveProperty("product1", ["1"]);
    expect(offers.getOffersByProduct()).toHaveProperty("product2", ["1"]);
  });

  it("should apply offers to the checkout order", () => {
    // Mock the result of findOffers method

    const offer: Offer = {
      id: "1",
      products: ["ipd", "product2"],
      offerMethod: jest.fn().mockReturnValueOnce({
        finalPrice: 99,
        billableQuantity: 1,
      }),
    };

    offers.addOffer(offer);

    // Call the applyOffers method
    const result: CheckoutOrder = offers.applyOffers(checkoutOrder);

    // Assert that the checkout order is updated as expected
    expect(result).toEqual({
      items: {
        ipd: {
          productName: "Super iPad",
          originalAmount: 199,
          finalAmount: 99,
          quantity: 1,
        },
      },
      finalValue: 99,
      orderValue: 199,
    });
  });
});
