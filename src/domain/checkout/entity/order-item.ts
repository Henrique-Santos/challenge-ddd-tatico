export default class OrderItem {
    
  private _productId: string
  private _name: string
  private _price: number
  private _quantity: number
  private _total: number

  constructor(readonly id: string, name: string, price: number, productId: string, quantity: number) {
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
    this._total = this.total()
    this.validate()
  }

  validate() {
    if (this._quantity <= 0) throw new Error('Quantity must be greater than 0')
  }

  total(): number {
    return this._price * this._quantity
  }

  get name(): string {
    return this._name
  }

  get productId(): string {
    return this._productId
  }

  get quantity(): number {
    return this._quantity
  }

  get price(): number {
    return this._price
  }
} 