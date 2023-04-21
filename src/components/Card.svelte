<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { Event } from '$lib/utils/sanity';
	import {client} from '$lib/utils/sanity'
	import { fade } from 'svelte/transition';


	$: count = 0
	$: showCount = false

	async function countEvent(slug: string) {
		const countRes = await fetch(`/worker?event=${slug}`, {method: 'POST'})
		const text = await countRes.text()

		count = text.split('|').length
		showCount = true
		setTimeout(() => {
			showCount = false
		}, 3000)
	}

	export let event: Event;
	export let index: number;
	console.log('🚀 ~ file: Card.svelte:17 ~ event:', event)

	const color = event.tags?.includes('yikes') ? 'bg-red-950' : 'bg-black'
</script>

<div>
	<div class="grid grid-cols-2 lg:gap-5 items-center justify-center">
		<div class="relative grid place-content-center aspect-square {index % 2 === 0 ? "order-last" : ""}">
			{#if !showCount}
				{#if event.mainImage?.asset}
					<img class="absolute inset-0" in:fade={{delay:400}} out:fade={{duration:400}} src="{event.mainImage?.asset.url}" alt="{event.mainImage.altText}">
				{/if}
			{:else}
				<p class="flex items-center gap-2" in:fade={{delay:400}} out:fade={{duration:300}}><span class="pt-1">count is:</span> <span class="text-3xl">{count}</span></p>
			{/if}
		</div>
		<button class={`text-3xl h-full p-5 text-white transition-colors duration-500 lowercase ${!showCount ? color : 'bg-green-950'}`} on:click={() => countEvent(event.slug.current)}>
			{event.title}
		</button>
	</div>
</div>