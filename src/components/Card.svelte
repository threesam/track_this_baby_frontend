<script lang="ts">
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
		}, 6900);
	}

	export let event: Event;
	export let index: number;

	const isYikes = event.tags?.includes('yikes');
	const color = isYikes ? 'bg-red-950' : 'bg-black';

	const src = urlFor(event.mainImage?.asset.url).auto('format').url()
</script>

<div>
	<div class="grid grid-cols-2 items-center justify-center">
		<div
			class="relative grid aspect-square place-content-center {index % 2 === 0 ? 'order-last' : ''}"
		>
			{#if !showCount}
				{#if event.mainImage?.asset}
					<img
						class="absolute inset-0 transition duration-300 hover:opacity-0"
						in:fade={{ delay: 400 }}
						out:fade={{ duration: 400 }}
						src={src}
						alt={'who cares'}
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
					amount={isYikes ? 20 : 100}
					size={isYikes ? 100 : 13}
					colorArray={isYikes ? ['url("https://www.nicepng.com/png/detail/23-232230_finger-clipart-middle-finger-emoji-middle-finger-emoji.png")'] : ['green', 'white', 'pink']}
				/>
			{/if}
		</button>
	</div>
</div>
