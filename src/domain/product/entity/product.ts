import ProductInterface from "./product.interface"

export default class Product implements ProductInterface {
    
    private _name: string
    private _price: number

    constructor(readonly id: string, name: string, price: number) {
        this._name = name
        this._price = price
        this.validate()
    }

    validate() {
        if (this.id.length == 0) throw new Error('Id is required')
        if (this._name.length == 0) throw new Error('Name is required')
        if (this._price < 0) throw new Error('Price must be greater than 0')
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }
}