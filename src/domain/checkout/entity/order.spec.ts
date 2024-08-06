import Order from "./order"
import OrderItem from "./order-item"

describe('Order unit tests', () => {

    it('shold throw erro when id is empty', () => {
        expect(() => {
            new Order('', '1', [])
        }).toThrow('Id is required')
    })

    it('shold throw erro when customerId is empty', () => {
        expect(() => {
            new Order('1', '', [])
        }).toThrow('CustomerId is required')
    })

    it('shold throw erro when items qtd is 0', () => {
        expect(() => {
            new Order('1', '1', [])
        }).toThrow('Items qtd must be greater than 0')
    })

    it('shold throw erro when item qtd is greater then 0', () => {
        expect(() => {
            new OrderItem('1', 'Item 1', 10, 'p1', 0)
        }).toThrow('Quantity must be greater than 0')
    })

    it('shold calculate total', () => {
        const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 1)
        const item2 = new OrderItem('2', 'Item 2', 20, 'p2', 2)
        const order = new Order('1', '123', [item1, item2]) 
        const total = order.total()
        expect(total).toBe(50)
    })
})