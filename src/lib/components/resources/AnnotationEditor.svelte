<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Annotation } from '$lib/types';

	interface Props {
		annotation: Annotation;
		onSave: (annotation: Annotation) => void;
		onDelete: (id: string) => void;
	}
	let { annotation, onSave, onDelete } = $props();

	let content = $state(annotation.content);
	let color = $state(annotation.color);

	function handleSave() {
		onSave({
			...annotation,
			content,
			color
		});
	}
</script>

<div class="rounded-lg bg-white p-4 shadow-lg" in:fade>
	<textarea
		bind:value={content}
		rows="3"
		class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
		placeholder="Add note..."
	></textarea>

	<div class="mt-4 flex justify-between">
		<div class="flex items-center gap-2">
			<label class="text-sm text-gray-600">Color:</label>
			<input type="color" bind:value={color} class="h-8 w-8 cursor-pointer rounded" />
		</div>

		<div class="space-x-2">
			<button class="text-red-600 hover:text-red-800" onclick={() => onDelete(annotation.id)}>
				Delete
			</button>
			<button class="btn-primary" onclick={handleSave}> Save </button>
		</div>
	</div>
</div>
