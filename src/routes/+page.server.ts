import { getEvents } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const events = await getEvents();
	console.log('events', events);

	if (events) {
		return {
			events
		};
	}

	throw error(404, 'Not found');
}
