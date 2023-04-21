<script lang="ts">
	import Card from '../components/Card.svelte';
	import Welcome from '../components/Welcome.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col lg:gap-5">
	{#if data.events.length}
		{#each data.events as event, index}
			<Card {event} {index} />
		{/each}
	{:else}
		<Welcome />
	{/if}
</section>
