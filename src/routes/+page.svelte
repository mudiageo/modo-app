<script>
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { user } from '$lib/stores/auth';
import '../app.css';

onMount(() => {
  if ($user) {
    goto('/app');
  }
});

let currentSlide = $state(0);
const slides = [
  {
    title: "Study smarter with AI",
    description: "Get personalized study plans and recommendations powered by artificial intelligence",
    image: "/images/study-ai.svg"
  },
  {
    title: "Track your progress",
    description: "Monitor your study habits and see your improvement over time",
    image: "/images/progress.svg"
  },
  {
    title: "Stay motivated",
    description: "Achieve your academic goals with our gamified learning experience",
    image: "/images/motivation.svg"
  }
];

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
}
</script>

<svelte:head>
  <title>Welcome to Modo</title>
</svelte:head>

<div class="min-h-screen bg-primary-600">
  <div class="relative h-screen overflow-auto px-4 py-16">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/30"></div>
      <div class="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary-700/30"></div>
    </div>

    <div class="relative mx-auto max-w-md">
      <!-- Logo -->
      <div class="mb-12 text-center">
        <img src="/favicon-512x512.png" alt="Modo" class="mx-auto h-16 w-16" />
      </div>

      <!-- Carousel -->
      <div class="mb-12">
        <div class="relative aspect-square">
          <!-- 3D Platform -->
          <div class="absolute inset-x-0 bottom-0 h-1/3 rounded-3xl bg-primary-700/50 backdrop-blur-lg"></div>
          
          <!-- Main Image -->
          <div class="absolute inset-0 flex items-center justify-center">
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              class="h-2/3 w-2/3 object-contain"
            />
          </div>
        </div>

        <!-- Text Content -->
        <div class="mt-8 text-center text-white">
          <h2 class="mb-4 text-2xl font-bold">{slides[currentSlide].title}</h2>
          <p class="text-primary-100">{slides[currentSlide].description}</p>
        </div>

        <!-- Dots -->
        <div class="mt-8 flex justify-center gap-2">
          {#each slides as _, i}
            <button 
              class="h-2 w-2 rounded-full transition-all {i === currentSlide ? 'bg-white w-6' : 'bg-primary-400'}"
              onclick={() => currentSlide = i}
            ></button>
          {/each}
        </div>
      </div>

      <!-- Buttons -->
      <div class="space-y-4 px-4">
        <a 
          href="/auth/signup"
          class="block w-full rounded-full bg-white py-4 text-center font-semibold text-primary-600 shadow-lg transition-transform hover:scale-105"
        >
          Get Started
        </a>
        <a 
          href="/auth/login"
          class="block w-full rounded-full border border-white/30 py-4 text-center font-semibold text-white backdrop-blur-sm transition-transform hover:scale-105"
        >
          Sign In
        </a>
      </div>
    </div>
  </div>
</div>

