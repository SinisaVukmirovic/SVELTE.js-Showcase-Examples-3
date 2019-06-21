<script>
    import { quintOut } from 'svelte/easing';
	import { fade, draw, fly } from 'svelte/transition';
	import { expand } from './custom-transitions.js';
	import { inner, outer } from './shape.js';

	let visible;
</script>

<!-- ============================================= -->
<style>
    svg {
		width: 20rem;
	}

	path {
		fill: #333;
		opacity: 1;
	}

	.centered {
		font-size: 5rem;
		transform: translate(0%,-230%);
		font-family: 'Overpass';
		letter-spacing: 0.12em;
		color: #eee;
		font-weight: 100;
	}

	.centered span {
		will-change: filter;
	}
</style>

<!-- ====================================== -->

<label>
	<input type="checkbox" bind:checked={visible}>
	Svelte is amazing!
</label>

{#if visible}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124">
		<g out:fade="{{duration: 1000,  delay: 500}}" opacity=0.5>
			<path
				in:expand="{{duration: 1000, delay: 1000, easing: quintOut}}"
				style="stroke: coral; fill: coral; stroke-width: 40;"
				d={outer}
			/>
			<path
				in:draw="{{duration: 2000}}"
				style="stroke:coral; stroke-width: 1.5"
				d={inner}
			/>
		</g>
	</svg>

	<div class="centered" out:fly="{{y: -50, duration: 1000}}">
		{#each 'SVELTE' as char, i}
			<span
				in:fade="{{delay: 2000 + i * 250, duration: 1000}}"
			>{char}</span>
		{/each}
	</div>
{/if}

<link href="https://fonts.googleapis.com/css?family=Overpass:100" rel="stylesheet">