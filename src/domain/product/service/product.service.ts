import Product from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(p => p.changePrice((p.price * percentage) / 100 + p.price))
    }
}