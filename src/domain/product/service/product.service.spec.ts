import Product from "../entity/product"
import ProductService from "./product.service"

describe('Product service unit tests', () => {

    it('should change the prices of all products', () => {
        const product1 = new Product('1', 'pen', 10)
        const product2 = new Product('2', 'book', 30)
        ProductService.increasePrice([product1, product2], 100)
        expect(product1.price).toBe(20)
        expect(product2.price).toBe(60)
    })
})