import { Checkout } from "../src/checkout";
import { Products } from "../src/products";
import { Offers } from "../src/offers";
import { atv3For2OfferMethod } from "../src/offers/atv-3-for-2";
import { ipadSlashPriceOfferMethod } from "../src/offers/ipad-slash-price-for-4";

// Mock products and offers for testing
const mockProducts = new Products();
const mockOffers = new Offers();

mockProducts.addProduct({ id: "ipd", name: "Super iPad", price: 549.99 });
mockProducts.addProduct({ id: "mbp", name: "MacBook Pro", price: 1399.99 });
mockProducts.addProduct({ id: "atv", name: "Apple TV", price: 109.5 });
mockProducts.addProduct({ id: "vga", name: "VGA Adapter", price: 30.0 });

mockOffers.addOffer({
  id: "atv-3-for-2",
  products: ["atv"],
  offerMethod: atv3For2OfferMethod,
});
mockOffers.addOffer({
  id: "ipad-slash-price-for-4",
  products: ["ipd"],
  offerMethod: ipadSlashPriceOfferMethod,
});

// Sample test cases
describe("Checkout", () => {
  let checkout: Checkout;

  beforeEach(() => {
    checkout = new Checkout(mockProducts, mockOffers);
  });

  it("should scan products and calculate the correct total - 1", () => {
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("vga");

    expect(checkout.total()).toBe(249);
  });

  it("should scan products and calculate the correct total - 2", () => {
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");

    expect(checkout.total()).toBe(2718.95);
  });

  it("should handle scanning of non-existing products", () => {
    checkout.scan("nonExistingProduct");

    // Since the product does not exist, the total should be 0
    expect(checkout.total()).toBe(0);
  });

  it("should handle empty cart gracefully", () => {
    // When there are no items scanned, the total should be 0
    expect(checkout.total()).toBe(0);
  });
});
