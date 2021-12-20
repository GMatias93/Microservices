import { Subjects, Publisher, PaymentCreatedEvent } from '@gmticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
}
