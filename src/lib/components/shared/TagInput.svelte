<script lang="s">
	/** @type {Array} */
	let { tags = $bindable([]) } = $props();

	let input = $state('');

	function addTag(e) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			const tag = input.trim();
			if (tag && !tags.includes(tag)) {
				tags = [...tags, tag];
			}
			input = '';
		}
	}

	function removeTag(index) {
		tags = tags.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-2">
	<div class="flex flex-wrap gap-2">
		{#each tags as tag, i}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-sm text-primary-800"
			>
				{tag}
				<button
					type="button"
					class="text-primary-600 hover:text-primary-800"
					onclick={() => removeTag(i)}
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</span>
		{/each}
	</div>

	<input
		type="text"
		bind:value={input}
		onkeydown={addTag}
		placeholder="Add tags (press Enter or comma to add)"
		class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
	/>
</div>
