import { Publisher, TicketCreatedEvent, Subjects } from '@gmticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}
