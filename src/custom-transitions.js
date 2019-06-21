import { cubicOut } from 'svelte/easing';

export function expand(node, params) {
	const {
		delay = 300,
		duration = 800,
		easing = cubicOut
	} = params;

	const w = parseFloat(getComputedStyle(node).strokeWidth);

	return {
		delay,
		duration,
		easing,
		css: t => `opacity: ${t}; stroke-width: ${t * w}`
	};
}