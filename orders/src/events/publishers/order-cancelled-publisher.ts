import { Subjects, Publisher, OrderCancelledEvent } from '@gmticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
