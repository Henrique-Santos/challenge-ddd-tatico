import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { v7 as uuid } from "uuid";

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((acc, el) => acc + el.total(), 0)
    }

    static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
        if (orderItems.length == 0) throw new Error('Order must have at least one item')
        const order = new Order(uuid(), customer.id, orderItems)
        customer.addRewardPoints(order.total() / 2)
        return order
    }
}