<script>
	// animation imports for animation of todo list
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    
    const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let todos = [
		{ id: 1, done: false, description: 'Keep learning Svelte' },
		{ id: 2, done: false, description: 'Talk about Svelte' },
		{ id: 3, done: true, description: 'React is not reactive' },
		{ id: 4, done: true, description: 'React is a terrible name for React.js' },
		{ id: 5, done: false, description: 'Build Svelte App' },
		{ id: 6, done: false, description: 'Watch Svelte videos' },
	];

    let uid = todos.length + 1;
    
    function add(input) {
		const todo = {
			id: uid++,
			done: false,
			description: input.value
		};

		todos = [todo, ...todos];
		input.value = '';
    }
    
    function remove(todo) {
        todos = todos.filter(t => t !== todo);
    }
</script>

<!-- ============================================== -->
<style>
	.board {
		max-width: 100%;
        margin: 1em 0;
    }

    .new-todo {
		font-size: 1.2rem;
		width: 100%;
		margin-bottom: 1em;
	}

    .cols {
        display: flex;
    }

	.left, .right {
		width: 50%;
		padding: .5em;
		box-sizing: border-box;
	}

	h5 {
		font-size: 1.25rem;
		font-weight: 200;
        user-select: none;
        padding: 0;
        margin: 0 0 1em;
	}

	label {
		top: 0;
		left: 0;
		display: block;
		font-size: 1.25rem;
		line-height: 1;
		padding: .5em;
		margin: 0 auto .5em auto;
		border-radius: 2px;
		background-color: #777;
		user-select: none;
	}

	input { margin: 0 }

	.right label {
		background-color: cornflowerblue;
	}

	button {
		float: right;
		height: 1em;
		box-sizing: border-box;
		padding: 0 .5em;
		line-height: 1;
		background-color: transparent;
		border: none;
		color: coral;
		opacity: 0;
		transition: opacity .2s;
	}

	label:hover button {
		opacity: 1;
	}
</style>

<!-- ============================================== -->

<div class="board">

    <input class="new-todo" placeholder="What's left todo?"
    on:keydown={event => event.which === 13 && add(this)} />

    <div class="cols">
        <div class="left">
            <h5>Things ToDo</h5>
            {#each todos.filter(t => !t.done) as todo (todo.id)}
                <label in:receive={{key: todo.id}}
                    out:send={{key: todo.id}}
                    animate:flip
                >
                    <input type=checkbox bind:checked={todo.done} />
                    {todo.description}
                    <button on:click={() => remove(todo)}></button>
                </label>
            {/each}
        </div>

        <div class="right">
            <h5>Things Done</h5>
            {#each todos.filter(t => t.done) as todo (todo.id)}
                <label in:receive={{key: todo.id}}
                    out:send={{key: todo.id}}
                    animate:flip
                >
                    <input type=checkbox bind:checked={todo.done} />
                    {todo.description}
                    <button on:click={() => remove(todo)}></button>
                </label>
            {/each}
        </div>
    </div>

</div>