<script>
	export let data
	console.log(Object.entries(data.eventData))
	import '../app.css';
	import { fade } from 'svelte/transition';
	import Confetti from 'svelte-confetti'
	let showModal = false;
	let showHearts = false

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
			transition:fade={{duration:200}}
			on:click={() => (showModal = false)}
			on:keypress={() => (showModal = false)}
			class="absolute inset-0 z-10 flex justify-center bg-black"
		>
		<button class="absolute top-5 right-5 text-red-400" on:click={() => (showModal = false)}>close</button>
		{#if !data.eventData}
			<h1 in:typewriter class="mt-[30%] text-white">okay, chill dude..</h1>
		{:else}
			<ul class="mt-12 text-white flex flex-col">
				{#each Object.entries(data.eventData) as [key, value]}
					<li class="py-5 grid grid-cols-2 items-center">
						<h3 class="text-right pr-5">{key}</h3>
						<div class="border-l-2 border-white pl-5 text-sm lg:text-base">
							<h5 class="text-slate-400">last tracked</h5>
							<p class="pb-3">{#if value.data}{value.timeSinceLastEvent}{:else}never{/if}</p>
							<h5 class="text-slate-400">total clicks</h5>
							<p>{value.data?.split('|').length ?? 0}</p>
						</div>
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
		<p class="flex items-center gap-1 relative">
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
					<Confetti size=25 colorArray={["url(https://www.onlygfx.com/wp-content/uploads/2016/05/hand-drawn-heart-1.png)"]} />
				</div>
			{/if}
			<span class="text-xl"> for Azalea </span>
		</p>
	</footer>
</div>

