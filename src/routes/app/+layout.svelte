<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import { initDB } from '$lib/db/idb';
	import '../../app.css';
	import { slide, fade } from 'svelte/transition';
	import { swipe } from '$lib/actions/swipe';
	import { profileStore } from '$lib/data/index.svelte.ts';
	import Icon from '$lib/icons/Icon.svelte';
	import NotificationToast from '$lib/components/NotificationToast.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import FloatingActionButton from '$lib/components/shared/FloatingActionButton.svelte';

	import { setupNotifications } from '$lib/utils/notifications';

	let isNavOpen = $state(false);

	onMount(async () => {
		if (browser) await initDB();
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
		await setupNotifications();
	});

	const profile = profileStore.data || {};

	/** @type {children: import('svelte').Snippet} */
	let { children } = $props();

	const navItems = [
		{ path: '/app', icon: 'home', label: 'Home' },
		{ path: '/app/tasks', icon: 'task', label: 'Tasks' },
		{ path: '/app/schedule', icon: 'calendar', label: 'Schedule' },
		{ path: '/app/study', icon: 'clock', label: 'Study' },
		{ path: '/app/settings', icon: 'cog', label: 'Settings' }
	];
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Top Navigation -->
	<!--<header class="fixed left-0 right-0 top-0 z-50 bg-white px-4 py-3 shadow-sm dark:bg-gray-800">-->
	<!--	<div class="flex items-center justify-between">-->
	<!--		<div class="flex items-center gap-3">-->
	<!--			<div class="h-10 w-10 overflow-hidden rounded-full bg-primary-100">-->
	<!--				{#if profile?.image}-->
	<!--					<img src={profile.image} alt={profile.name} class="h-full w-full object-cover" />-->
	<!--				{:else}-->
	<!--					<div class="flex h-full w-full items-center justify-center bg-primary-600 text-white">-->
	<!--						{profile?.name?.[0] || 'U'}-->
	<!--					</div>-->
	<!--				{/if}-->
	<!--			</div>-->
	<!--			<div>-->
	<!--				<h1 class="text-lg font-semibold text-gray-900 dark:text-white">-->
	<!--					Hi, {profile?.name?.split(' ')[0] || 'User'}-->
	<!--				</h1>-->
	<!--				<p class="text-sm text-gray-500 dark:text-gray-400">-->
	<!--					{#if page.url.pathname === '/app/tasks'}-->
	<!--						6 Tasks are pending-->
	<!--					{:else}-->
	<!--						Welcome back-->
	<!--					{/if}-->
	<!--				</p>-->
	<!--			</div>-->
	<!--		</div>-->

	<!--		<button-->
	<!--			onclick={() => (isNavOpen = !isNavOpen)}-->
	<!--			class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"-->
	<!--		>-->
	<!--			<Icon icon={isNavOpen ? 'close' : 'hamburger'} h="6" w="6" />-->
	<!--		</button>-->
	<!--	</div>-->
	<!--</header>-->
<Header />
	<!-- Main Content -->
	<main class="container mx-auto px-4 pb-20 pt-24">
		<div in:fade={{ duration: 200 }}>
			{@render children()}
		</div>
	</main>

	<!-- Bottom Navigation -->
	<nav
		class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="grid h-16 grid-cols-5">
			{#each navItems as { path, icon, label }}
				<a
					href={path}
					class="flex flex-col items-center justify-center gap-1 {page.url.pathname === path
						? 'text-primary-600 dark:text-primary-400'
						: 'text-gray-600 dark:text-gray-400'}"
				>
					<Icon {icon} h="6" w="6" />
					<span class="text-xs">{label}</span>
				</a>
			{/each}
		</div>
	</nav>

	<NotificationToast />
	<FloatingActionButton />
</div>