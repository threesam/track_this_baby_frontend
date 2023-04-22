import { getEvents } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import { format, formatDistance, subHours } from 'date-fns';

export async function load({ fetch }) {
	const events = await getEvents();

	const slugs = events.map((event) => event.slug.current);

	const eventDataRes = await fetch('/worker?event=' + slugs.toString());
	const { data: eventData } = await eventDataRes.json();

	for (const event in eventData) {
		const data = eventData[event];
		eventData[event] = {
			data,
			timeSinceLastEvent: timeSinceLastEvent(data ?? '')
		};
	}

	console.log({ eventData });

	if (events) {
		return {
			events,
			eventData
		};
	}

	throw error(404, 'Not found');
}

function timeSinceLastEvent(events: string) {
	const eventsArray = events.split('|');
	return formatDistance(subHours(+eventsArray[eventsArray.length - 1], 0), new Date(), {
		addSuffix: true
	});
}