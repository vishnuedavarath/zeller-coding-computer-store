import {
  CheckoutCart,
  CheckoutOrder,
  CheckoutProduct,
} from "./interface/checkout.interface";
import { Product } from "./interface/products.interface";
import { Offers } from "./offers";
import { Products } from "./products";

export class Checkout {
  private products: Products;
  private offers: Offers;
  private checkoutCart: CheckoutCart;
  private checkoutOrder: CheckoutOrder;
  constructor(products: Products, offers: Offers) {
    this.products = products;
    this.offers = offers;
    this.checkoutCart = {};
    this.checkoutOrder = { items: {}, orderValue: 0, finalValue: 0 };
  }

  // Scan the items and store in cart object
  public scan(productId: string) {
    if (this.checkoutCart[productId]) this.checkoutCart[productId]++;
    else this.checkoutCart[productId] = 1;
  }

  // Checkout the items in cart by proper resolutions of offers
  private checkout(checkoutCart: CheckoutCart) {
    //Create order object from cart in the format
    /*

    {
        items: {
            product: {
                productName: "Product Name",
                finalAmount: 0,
                originalAmount: 0,
                quantity: 0,
                extra: {
                    quantity : 0,
                    price : 0
                };
            }  
        };
        orderValue: 0,
        finalValue: 0
    }

    */
    this.checkoutOrder = Object.keys(checkoutCart).reduce(
      (obj: CheckoutOrder, id: string): CheckoutOrder => {
        //Create initial order object before applying offers
        const product: Product = this.products.getProduct(id);
        if (product) {
          const checkoutProduct: CheckoutProduct = {
            productName: product.name,
            quantity: checkoutCart[id],
            originalAmount: product.price,
            finalAmount: product.price,
          };
          obj.items[id] = checkoutProduct;
          obj.orderValue += product.price * checkoutProduct.quantity;
          obj.finalValue = obj.orderValue;
        }
        return obj;
      },
      { items: {}, orderValue: 0, finalValue: 0 }
    );

    // Apply offers on the order object
    this.checkoutOrder = this.offers.applyOffers(this.checkoutOrder);
  }

  // Find total value of the order
  public total(): number {
    //checkout the cart
    this.checkout(this.checkoutCart);
    return this.checkoutOrder.finalValue;
  }
}
