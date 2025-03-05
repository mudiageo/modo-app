<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import '../../app.css';

	onMount(() => {
		if ($user) {
			goto('/app');
		}
	});
</script>

<svelte:head>
	<title>Welcome to Modo</title>
</svelte:head>
shehehehehehr
<div class="min-h-screen bg-blue-600">
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/30"></div>
      <div class="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-700/30"></div>
    </div>

    <div class="relative mx-auto w-full max-w-md px-4">
      <div class="mb-8 text-center">
        <div class="relative mx-auto h-48 w-48 overflow-hidden rounded-full bg-blue-100">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative h-full w-full">
              <!-- Abstract Design -->
              <div class="absolute inset-0">
                <svg viewBox="0 0 200 200" class="h-full w-full">
                  <path d="M 0,50 C 50,0 150,0 200,50 S 200,150 150,200 S 50,200 0,150 Z" fill="rgb(59, 130, 246)" />
                  <circle cx="100" cy="100" r="30" fill="rgb(37, 99, 235)" />
                  <path d="M 50,0 Q 100,100 50,200" stroke="rgb(147, 197, 253)" fill="none" stroke-width="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-white">Manage your daily tasks</h2>
        <p class="mt-2 text-blue-100">Team and Project management with solution providing App</p>
      </div>

      <div class="rounded-2xl bg-white/10 p-8 backdrop-blur-lg">
        <button class="w-full rounded-xl bg-white py-3 text-center font-semibold text-blue-600 shadow-lg transition-transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  </div>
</div>