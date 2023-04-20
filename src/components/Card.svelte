<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { Event } from '$lib/utils/sanity';
	import {client} from '$lib/utils/sanity'

	$: count = 0

	async function countEvent(slug: string) {
		const countRes = await fetch(`/worker?event=${slug}`, {method: 'POST'})
		const text = await countRes.text()

		count = text.split('|').length
	}

	export let event: Event;
</script>

<div>
	<div class="flex gap-5 items-center">
		<button class="text-3xl p-5 bg-black text-white lowercase" on:click={() => countEvent(event.slug.current)}>
			{event.title}
		</button>
		{#if count}
			<span>{count} times counted</span>
		{/if}
	</div>
</div>