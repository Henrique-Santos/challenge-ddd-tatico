import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../customer/repository/sequelize/customer.model"
import ProductModel from "../../../product/repository/sequelize/product.model"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"
import ProductRepository from "../../../product/repository/sequelize/product.repository"
import Product from "../../../../domain/product/entity/product"
import OrderItem from "../../../../domain/checkout/entity/order-item"
import OrderRepository from "./order.repository"
import OrderItemModel from "./order-item.model"
import OrderModel from "./order.model"
import Order from "../../../../domain/checkout/entity/order"

describe('Order repository test', () => {

    let sequelize: Sequelize
  
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([
            CustomerModel,
            ProductModel,
            OrderItemModel,
            OrderModel,
        ])
        await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    })
  
    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        await customerRepository.create(customer)
        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const order = new Order('1', '1', [orderItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ['items'],
        })
        expect(orderModel.toJSON()).toStrictEqual({
            id: '1',
            customer_id: '1',
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: '1',
                    product_id: '1',
                },
            ],
        })
    })

    it('should update an order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        await customerRepository.create(customer)
        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const order = new Order('1', '1', [orderItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ['items'],
        })
        expect(orderModel.toJSON()).toStrictEqual({
            id: '1',
            customer_id: '1',
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: '1',
                    product_id: '1',
                },
            ],
        })
        const product2 = new Product('2', 'Product 2', 20)
        productRepository.create(product2)
        const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 2)
        order.addOrderItems([orderItem2])
        orderRepository.update(order)
        const orderModel2 = await OrderModel.findByPk(order.id, { include: ['items'] })
        await orderModel2.reload()
        expect(orderModel2.toJSON()).toStrictEqual({
            id: '1',
            customer_id: '1',
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: '1',
                    product_id: '1',
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: '1',
                    product_id: '2',
                },
            ],
        })
    })

    it('should find a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        await customerRepository.create(customer)
        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const order = new Order('1', '1', [orderItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ['items'],
        })
        const foundOrder = await orderRepository.find(order.id)
        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            items: foundOrder.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
                order_id: foundOrder.id,
            }))
        })
    })

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        await customerRepository.create(customer)
        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        const product2 = new Product('2', 'Product 2', 20)
        await productRepository.create(product)
        await productRepository.create(product2)
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 2)
        const order = new Order('1', '1', [orderItem])
        const order2 = new Order('2', '1', [orderItem2])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        await orderRepository.create(order2)
        const foundOrders = await orderRepository.findAll()
        const orders = [order, order2]
        expect(orders).toEqual(foundOrders)  
    })
})  