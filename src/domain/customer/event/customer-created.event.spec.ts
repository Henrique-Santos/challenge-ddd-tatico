import Customer from "../entity/customer";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1WhenCustomerIsCreated from "./handler/send-console-log-1-when-customer-is-created";
import SendConsoleLog2WhenCustomerIsCreated from "./handler/send-console-log-2-when-customer-is-created";

describe('Customer event created tests', () => {

    it('should call the handlers', () => {
        const customer = new Customer('123', 'Jhon')
        const eventDispatcher = new EventDispatcher()
        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreated()
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreated()
        const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')
        eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2)
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1)
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2)
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name
        })
        eventDispatcher.notify(customerCreatedEvent)
        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })
})