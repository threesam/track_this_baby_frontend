<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { Event } from '$lib/utils/sanity';
	import { fade } from 'svelte/transition';
	import { Confetti } from 'svelte-confetti';

	$: count = 0;
	$: showCount = false;

	async function countEvent(slug: string) {
		const countRes = await fetch(`/worker?event=${slug}`, { method: 'POST' });
		const text = await countRes.text();

		count = text.split('|').length;
		showCount = true;
		setTimeout(() => {
			showCount = false;
		}, 3000);
	}

	export let event: Event;
	export let index: number;

	const isYikes = event.tags?.includes('yikes');
	const color = isYikes ? 'bg-red-950' : 'bg-black';
</script>

<div>
	<div class="grid grid-cols-2 items-center justify-center">
		<div
			class="relative grid aspect-square place-content-center {index % 2 === 0 ? 'order-last' : ''}"
		>
			{#if !showCount}
				{#if event.mainImage?.asset}
					<img
						class="absolute inset-0 hover:opacity-0"
						in:fade={{ delay: 400 }}
						out:fade={{ duration: 400 }}
						src={event.mainImage?.asset.url}
						alt={event.mainImage.altText}
					/>
					
				{/if}
			{:else}
				<p class="flex items-center gap-2" in:fade={{ delay: 400 }} out:fade={{ duration: 300 }}>
					<span class="pt-1">count is:</span> <span class="text-3xl">{count}</span>
				</p>
			{/if}
		</div>
		<button
			class={`grid h-full place-content-center p-5 text-3xl lowercase text-white transition-colors duration-500 ${
				!showCount ? color : isYikes ? 'bg-red-700' : 'bg-green-950'
			}`}
			on:click={() => countEvent(event.slug.current)}
		>
			{event.title}
			{#if showCount}
				<Confetti
					amount={100}
					colorArray={isYikes ? ['red', 'black'] : ['green', 'white', 'pink']}
				/>
			{/if}
		</button>
	</div>
</div>
