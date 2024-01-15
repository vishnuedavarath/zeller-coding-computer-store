// products.test.ts
import { Product } from "src/interface/products.interface";
import { Products } from "../src/products";

describe("Products", () => {
  let products: Products;

  beforeEach(() => {
    products = new Products();
  });

  it("should add a product to the catalogue", () => {
    const product: Product = {
      id: "1",
      name: "Product 1",
      price: 99,
    };

    products.addProduct(product);

    // Assert that the product is added to the catalogue
    expect(products.getCatalogue()).toHaveProperty("1", product);
  });

  it("should get a product by ID", () => {
    const product: Product = {
      id: "1",
      name: "Product 1",
      price: 99,
    };

    products.addProduct(product);

    // Call getProduct and assert that it returns the correct product
    expect(products.getProduct("1")).toEqual(product);
  });

  it("should delete a product from the catalogue", () => {
    const product: Product = {
      id: "1",
      name: "Product 1",
      price: 99,
    };

    products.addProduct(product);

    // Call deleteProduct and assert that the product is deleted
    products.deleteProduct("1");
    expect(products.getCatalogue()).not.toHaveProperty("1");
  });

  it("should get the entire catalogue", () => {
    const product1: Product = {
      id: "1",
      name: "Product 1",
      price: 99,
    };

    const product2: Product = {
      id: "2",
      name: "Product 2",
      price: 199,
    };

    products.addProduct(product1);
    products.addProduct(product2);

    // Call getCatalogue and assert that it returns the entire catalogue
    expect(products.getCatalogue()).toEqual({
      "1": product1,
      "2": product2,
    });
  });
});
