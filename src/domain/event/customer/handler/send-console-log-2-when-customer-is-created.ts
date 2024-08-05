import EventHandlerInterface from "../../shared/event-handler.interface";
import EventInterface from "../../shared/event.interface";

export default class SendConsoleLog2WhenCustomerIsCreated implements EventHandlerInterface {
    
    handle(event: EventInterface): void {
        console.log(`Esse é o segundo console.log do evento: ${event.constructor.name}`)
    }
}