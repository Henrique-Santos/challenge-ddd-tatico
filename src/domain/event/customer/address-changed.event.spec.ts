import Customer from "../../entity/customer"
import Address from "../../value-object/address"
import EventDispatcher from "../shared/event-dispatcher"
import AddressChangedEvent from "./address-changed.event"
import SendConsoleLogWhenAddressIsChanged from "./handler/send-console-log-when-address-is-changed"

describe('Address event changed tests', () => {

    it('should call the handlers', () => {
        const customer = new Customer('123', 'Jhon')
        const address = new Address('Rua um', 1, '12345-678', 'São Paulo')
        customer.changeAddress(address)
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendConsoleLogWhenAddressIsChanged()
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')
        eventDispatcher.register('AddressChangedEvent', eventHandler)
        expect(eventDispatcher.getEventHandlers['AddressChangedEvent'][0]).toMatchObject(eventHandler)
        const customerCreatedEvent = new AddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                number: address.number,
                zip: address.zip,
                city: address.city
            }
        })
        eventDispatcher.notify(customerCreatedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
    })
})