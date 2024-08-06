import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe('Customer factory unit tests', () => {

    it('should create a customer', () => {
        const customer = CustomerFactory.create('John')
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe('John')
        expect(customer.address).toBeUndefined()
        expect(customer.constructor.name).toBe('Customer')
    })

    it('should create a customer with an address', () => {
        const address = new Address('Street', 1, '13330-250', 'São Paulo')
        const customer = CustomerFactory.createWithAddress('John', address)
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe('John')
        expect(customer.address).toBe(address)
        expect(customer.constructor.name).toBe('Customer')
    })
})