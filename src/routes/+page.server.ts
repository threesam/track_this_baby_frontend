import { getEvents } from '$lib/utils/sanity';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

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
