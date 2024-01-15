import { Catalogue, Product } from "./interface/products.interface";

export class Products {
  private catalogue: Catalogue;
  constructor() {
    this.catalogue = {};
  }

  // Add product to the product catalogue
  public addProduct(product: Product) {
    this.catalogue[product.id] = product;
  }

  // Get a product using its id
  public getProduct(id: string): Product {
    return this.catalogue[id];
  }

  // Delete a product with given id from catalogue
  public deleteProduct(id: string) {
    delete this.catalogue[id];
  }

  // Get the product catalogue
  public getCatalogue(): Catalogue {
    return this.catalogue;
  }
}
