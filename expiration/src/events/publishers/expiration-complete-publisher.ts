import {
	Subjects,
	Publisher,
	ExpirationCompleteEvent,
} from '@gmticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
}
