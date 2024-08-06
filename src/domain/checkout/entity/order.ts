import OrderItem from "./order-item"

export default class Order {

    private _customerId: string
    private _items: OrderItem[]
    private _total: number

    constructor(readonly id: string, customerId: string, items: OrderItem[]) {
        this._customerId = customerId
        this._items = items
        this._total = this.total()
        this.validate()
    }

    validate() {
        if (this.id.length == 0) throw new Error('Id is required')
        if (this._customerId.length == 0) throw new Error('CustomerId is required')
        if (this._items.length == 0) throw new Error('Items qtd must be greater than 0')
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.total(), 0)
    }

    addOrderItems(orderItems: OrderItem[]): void {
        this._items.push(...orderItems)
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }
}