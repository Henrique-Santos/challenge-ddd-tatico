import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        )
    }

    async update(entity: Order): Promise<void> {
        await OrderItemModel.destroy({
            where: { order_id: entity.id }
        })
        await OrderItemModel.bulkCreate(
            entity.items.map(item => ({
                id: item.id,
                order_id: entity.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            }))
        )
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                where: { id: entity.id }
            }
        )
    }

    async find(id: string): Promise<Order> {
        const orderData = await OrderModel.findOne({ where: { id }, include: ['items'] })
        return new Order(orderData.id, orderData.customer_id, orderData.items.map(i => new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity)))
    }

    async findAll(): Promise<Order[]> {
        const ordersData = await OrderModel.findAll({ include: ['items'] })
        return ordersData.map(o => {
            return new Order(o.id, o.customer_id, o.items.map(i => new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity)))
        })
    }
}