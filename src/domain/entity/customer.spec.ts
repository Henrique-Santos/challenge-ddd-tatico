import Address from "../value-object/address"
import Customer from "./customer"

describe('Customer unit tests', () => {

    it('should throw erro when id is empty', () => {
        expect(() => {
            new Customer('', 'John')
        }).toThrow('Id is required')
    })

    it('should throw erro when name is empty', () => {
        expect(() => {
            new Customer('1', '')
        }).toThrow('Name is required')
    })

    it('should change name', () => {
        const customer = new Customer('1', 'John')
        customer.changeName('Jane')
        expect(customer.name).toBe('Jane')
    })

    it('should activate customer', () => {
        const address = new Address('Rua dois', 2, '12345-678', 'São Paulo')
        const customer = new Customer('1', 'John')
        customer.address = address
        customer.activate()
        expect(customer.isActive()).toBeTruthy()
    })

    it('should deactivate customer', () => {
        const address = new Address('Rua dois', 2, '12345-678', 'São Paulo')
        const customer = new Customer('1', 'John')
        customer.address = address
        customer.activate()
        customer.deactivate()
        expect(customer.isActive()).toBeFalsy()
    })

    it('should throw erro when address is undefined when you activate a customer', () => {
        const customer = new Customer('1', 'John')
        expect(() => {
            customer.activate()
        }).toThrow('Address is mandatory to activete a customer')
    })

    it('should add reword points', () => {
        const customer = new Customer('1', 'Customer 1')
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })
})