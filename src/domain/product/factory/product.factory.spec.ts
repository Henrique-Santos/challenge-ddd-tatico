import ProductFactory from "./product.factory"

describe('Product factory unit tests', () => {

    it('should create a product type a', () => {
        const product = ProductFactory.create('a', 'Product A', 1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe('Product A')
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe('Product')
    })

    it('should throw an error when product type is not supported', () => {
        expect(() => ProductFactory.create('b', 'Product B', 1)).toThrow('Product type not supported')
    })
})