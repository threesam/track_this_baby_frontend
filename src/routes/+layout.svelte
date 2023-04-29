<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let hours = {} as {[key:string]: number[]}
	// @ts-ignore
	Object.entries(data.eventData).forEach(([type, {data}]) => {
		const timestamps: string[] = data.split('|')
		const hArray =  timestamps.reduce((acc, curr) => {
			const hour = new Date(+curr).getHours()
			if(!acc[hour]) {
				acc[hour] = 1
			} else {
				acc[hour]++
			}
			return acc
		}, {})
		hours[type] = hArray
	});
	console.log({hours})
	import '../app.css';
	import { fade } from 'svelte/transition';
	import Confetti from 'svelte-confetti';
	let showModal = false;
	let showHearts = false;

	function explodeHearts() {
		showHearts = true;
		setTimeout(() => {
			showHearts = false;
		}, 2000);
	}

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<div class="relative font-display">
	{#if showModal}
		<div
			transition:fade={{ duration: 200 }}
			on:click={() => (showModal = false)}
			on:keypress={() => (showModal = false)}
			class="absolute inset-0 z-10 flex h-screen justify-center bg-black"
		>
			<button class="absolute right-5 top-5 text-red-400" on:click={() => (showModal = false)}
				>close</button
			>
			{#if !data.eventData}
				<h1 in:typewriter class="mt-[30%] text-white">okay, chill dude..</h1>
			{:else}
				<!-- <ul class="mt-12 flex flex-col text-white">
					{#each Object.entries(data.eventData) as [key, value]}
						<li class="grid grid-cols-2 items-center py-5">
							<h3 class="pr-5 text-right">{key}</h3>
							<div class="border-l-2 border-white pl-5 text-sm lg:text-base">
								<h5 class="text-slate-400">last tracked</h5>
								<p class="pb-3">
									{#if value.data}{value.timeSinceLastEvent}{:else}never{/if}
								</p>
								<h5 class="text-slate-400">total clicks</h5>
								<p>{value.data?.split('|').length ?? 0}</p>
							</div>
						</li>
					{/each}
				</ul> -->

				<ul class="flex gap-5 mt-12">
					{#each Object.entries(hours) as [key, values]}
						<li class="text-light w-max p-2">
							<h3 class="text-pink-500 border-b-2 pb-1 border-pink-600">{key}</h3>
							<ul>
								<li class="w-full flex justify-between gap-2 py-1"><span class="text-yellow-300">time</span><span class="text-yellow-300">X</span></li>
								{#each Object.entries(values) as [time, amount]}
									<li class="w-full flex justify-between"><span class="text-pink-300">{+time > 12 ? `${+time - 12}pm` : `${time}am`}</span><span>{amount}</span></li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
	<header class="flex w-full justify-center p-5 text-xl uppercase">
		<button
			class="text-3xl text-black transition-all duration-500 hover:tracking-wide hover:text-red-900"
			on:click={() => (showModal = true)}>track that <span class="">baby</span></button
		>
	</header>
	<main class="mx-auto mt-0 max-w-2xl">
		<slot />
	</main>
	<footer class="flex w-full justify-center p-5">
		<p class="relative flex items-center gap-1">
			<span class="text-xl"> made with </span>
			<svg
				on:click={explodeHearts}
				on:keypress={explodeHearts}
				class="text-red-950"
				data-sanity-icon="heart-filled"
				width="2em"
				height="2em"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="1.2"
				/></svg
			>
			{#if showHearts}
				<div class="absolute inset-0 flex justify-center">
					<Confetti
						size="25"
						colorArray={[
							'url(https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-1.png)'
						]}
					/>
				</div>
			{/if}
			<span class="text-xl"> for Azalea </span>
		</p>
	</footer>
</div>
