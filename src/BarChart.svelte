<script>
    import { scaleLinear } from 'd3-scale';

    const points = [
		{ jsFrame: 'Svelte', awesomness: 10 },
		{ jsFrame: 'React', awesomness: 3 },
		{ jsFrame: 'Vue', awesomness: 7 },
		{ jsFrame: 'Angular', awesomness: 2 }
    ];
    
    const xTicks = ['Svelte', 'React', 'Vue', 'Angular'];
    const yTicks = [0, 2, 4, 6, 8, 10];
    const padding = { top: 20, right: 25, bottom: 20, left: 45 };
    
    let width = 500;
    let height = 200;
    
    function formatMobile(tick) {
		return "'" + tick % 100;
	}

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<!-- ======================================== -->
<style>
    .chart {
		width: 100%;
		max-width: 400px;
		margin: 1em auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 300px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: coral;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
        text-anchor: middle;
        font-size: 1rem;
        font-weight: bold;
	}

	.bars rect {
		fill: cornflowerblue;
        opacity: 0.5;
	}

	@media screen and (max-width: 900px) {
		svg {
			height: 200px;
		}
	}

	@media screen and (max-width: 768px) {
		svg {
			height: 150px;
		}
	}
</style>

<!-- ======================================== -->

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis" transform="translate(0,{padding.top})">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
					<line x2="100%"></line>
					<text y="-4">{tick} {tick === 20 ? ' per 1,000 population' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each points as point, i}
				<g class="tick" transform="translate({xScale(i)},{height})">
					<text x="{barWidth/2}" y="-4">{width > 380 ? point.jsFrame : formatMobile(point.jsFrame)}</text>
				</g>
			{/each}
		</g>

		<g class='bars'>
			{#each points as point, i}
				<rect
					x="{xScale(i) + 2}"
					y="{yScale(point.awesomness)}"
					width="{barWidth - 12}"
					height="{height - padding.bottom - yScale(point.awesomness)}"
				></rect>
			{/each}
		</g>
	</svg>
</div>