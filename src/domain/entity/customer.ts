import Address from "../value-object/address";

export default class Customer {

    private _address!: Address
    private _name: string
    private _active: boolean = false
    private _rewardPoints: number = 0

    constructor (readonly id: string, name: string) {
        this._name = name
        this.validate()
    }

    validate() {
        if (this.id.length == 0) throw new Error('Id is required')
        if (this._name.length == 0) throw new Error('Name is required')
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    activate() {
        if (this._address == undefined) throw new Error('Address is mandatory to activete a customer')
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    isActive() {
        return this._active
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    get name(): string {
        return this._name
    }

    set address(address: Address) {
        this._address = address
    }

    get address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }
}