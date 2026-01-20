<script lang="ts">
import { fade, slide } from 'svelte/transition';
import { gamificationStore } from '$lib/data/gamification.svelte.ts';
//import LeaderboardCard from './/LeaderboardCard.svelte';

let leaderboard = $state([
  {
    id: 1,
    name: 'John Doe',
    points: 1200,
    rank: 1,
    streak: 7,
    achievements: 12
  },
  {
    id: 2,
    name: 'Jane Smith',
    points: 1150,
    rank: 2,
    streak: 5,
    achievements: 10
  },
  {
    id: 3,
    name: 'Alex Johnson',
    points: 1000,
    rank: 3,
    streak: 4,
    achievements: 8
  }
]);

let timeframe = $state('weekly');
let gameState = $state(gamificationStore.data || {});
</script>

<div class="mx-auto max-w-4xl">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
    <div class="flex gap-2">
      <button 
        class="rounded-lg px-4 py-2 text-sm font-medium {timeframe === 'weekly' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}"
        onclick={() => timeframe = 'weekly'}
      >
        Weekly
      </button>
      <button 
        class="rounded-lg px-4 py-2 text-sm font-medium {timeframe === 'monthly' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}"
        onclick={() => timeframe = 'monthly'}
      >
        Monthly
      </button>
      <button 
        class="rounded-lg px-4 py-2 text-sm font-medium {timeframe === 'alltime' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}"
        onclick={() => timeframe = 'alltime'}
      >
        All Time
      </button>
    </div>
  </div>

  <div class="space-y-6">
    <!-- Top 3 Podium -->
    <div class="grid grid-cols-3 gap-4" in:fade>
      {#each leaderboard.slice(0, 3) as user, i}
        <div class="flex flex-col items-center">
          <div class="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
            <span class="text-3xl font-bold text-primary-600">#{user.rank}</span>
          </div>
          <p class="font-medium text-gray-900">{user.name}</p>
          <p class="text-sm text-gray-500">{user.points} points</p>
        </div>
      {/each}
    </div>

    <!-- Full Leaderboard -->
    <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <div class="space-y-4">
        {#each leaderboard as user}
          <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700" in:slide>
            <div class="flex items-center gap-4">
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                #{user.rank}
              </span>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{user.streak} day streak</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-primary-600">{user.points} points</p>
              <p class="text-sm text-gray-500">{user.achievements} achievements</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>