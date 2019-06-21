<script>
	import NavBar from './NavBar.svelte';
	import Todo from './Todo.svelte';
	import BarChart from './BarChart.svelte';
	import SvgTransition from './SvgTransition.svelte';
	import Footer from './Footer.svelte';

</script>

<!-- ================================== -->
<!-- styles -->
<!-- ================================== -->
<style>
	.container {
		font-size: 1.25rem;
		width: 60%;
		margin: 1em auto;
		padding: 1em;
	}

	.svg-container {
		height: 23rem;
		width: auto;
	}

	@media screen and (max-width: 900px) {
		.container {
			width: 80%;
		}
	}

	@media screen and (max-width: 768px) {
		.container {
			width: 90%;
		}
	}
</style>

<!-- ================================== -->
<!-- html -->
<!-- ================================== -->
<NavBar/>

<div class="container">

	<Todo/>

	<hr>

	<h3>Awesomeness Bar Chart</h3>

	<BarChart/>

	<hr>

	<div class="svg-container">
		<SvgTransition/>
	</div>

</div>

<Footer/>