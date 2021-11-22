import { Publisher, TicketUpdatedEvent, Subjects } from '@gmticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}
