import { Subjects, Publisher, OrderCancelledEvent } from '@gmticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
