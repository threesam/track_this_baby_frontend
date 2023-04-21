<script>
	import '../app.css';
	import { fade } from 'svelte/transition';
	let showModal = false;

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
			class="absolute inset-0 z-10 flex justify-center bg-black/70"
		>
			<h1 in:typewriter class="mt-[30%] text-white">okay, chill dude..</h1>
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
		<p class="flex items-center gap-1">
			<span class="text-xl"> made with </span>
			<svg
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
			<span class="text-xl"> for Azalea </span>
		</p>
	</footer>
</div>
