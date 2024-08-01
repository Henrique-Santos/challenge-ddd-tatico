import Product from "./product"

describe('Product unit tests', () => {

    it('should throw erro when id is empty', () => {
        expect(() => {
            new Product('', 'Product 1', 100)
        }).toThrow('Id is required')
    })

    it('should throw erro when name is empty', () => {
        expect(() => {
            new Product('1', '', 100)
        }).toThrow('Name is required')
    })

    it('should throw erro when price is less then 0', () => {
        expect(() => {
            new Product('1', 'Product 1', -1)
        }).toThrow('Price must be greater than 0')
    })

    it('should change name', () => {
        const product = new Product('1', 'Rice', 10)
        product.changeName('Been')
        expect(product.name).toBe('Been')
    })

    it('should change price', () => {
        const product = new Product('1', 'Rice', 10)
        product.changePrice(20)
        expect(product.price).toBe(20)
    })
})