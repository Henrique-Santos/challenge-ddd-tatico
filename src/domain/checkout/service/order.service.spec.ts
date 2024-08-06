import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order-item"
import OrderService from "./order.service"

describe('Order service unit tests', () => {

    it('should get total of all orders', () => {
        const item1 = new OrderItem('1', 'item 1', 100, 'p1', 1)
        const item2 = new OrderItem('2', 'item 2', 200, 'p2', 2)
        const order = new Order('1', 'c1', [item1])
        const order2 = new Order('2', 'c1', [item2])
        const total = OrderService.total([order, order2])
        expect(total).toBe(500)
    })

    it('should place an order', () => {
        const customer = new Customer('1', 'Customer 1')
        const item = new OrderItem('1', 'item 1', 100, 'p1', 1)
        const order = OrderService.placeOrder(customer, [item])
        expect(customer.rewardPoints).toBe(50)
        expect(order.total()).toBe(100)
    })
})