import EventHandlerInterface from "../../shared/event-handler.interface";
import EventInterface from "../../shared/event.interface";

export default class SendConsoleLogWhenAddressIsChanged implements EventHandlerInterface {

    handle(event: EventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.zip} ${event.eventData.address.city}`)
    }
}