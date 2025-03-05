<script lang="ts">
import type { PageData, ActionData } from './$types';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { signIn } from 'svelte-guardian/client';
import { enhance, applyAction } from '$app/forms';
import { profileStore } from '$lib/data/index.svelte.ts';

let { data, form }: { data: PageData; form: ActionData } = $props();

let formData = $state({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});
let user = form?.user;
let error = $state('');

if (form?.success) {
  profileStore.data = { name: user.name, email: user.email };
  handleSignIn();
}

async function handleSignIn() {
  try {
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: '/auth/onboarding'
    });

    if (result?.error) {
      error = 'Invalid email or password';
    } else {
      if (page.data) console.log(page.data);
    }
  } catch (e) {
    error = 'An error occurred. Please try again.';
  }
}
</script>

<div class="min-h-screen bg-primary-600">
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/30"></div>
      <div class="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary-700/30"></div>
    </div>

    <div class="relative mx-auto w-full max-w-md px-4">
      <div class="mb-8 text-center">
        <img src="/favicon-512x512.png" alt="Modo" class="mx-auto h-16 w-16" />
        <h2 class="mt-6 text-3xl font-bold text-white">Create your account</h2>
        <p class="mt-2 text-primary-100">Join our community of learners today</p>
      </div>

      <div class="rounded-2xl bg-white/10 p-8 backdrop-blur-lg">
        {#if error || form?.error}
          <div class="mb-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-200">
            {error || form?.error}
          </div>
        {/if}

        {#if form?.success}
          <div class="mb-4 rounded-lg bg-green-500/10 p-4 text-sm text-green-200">
            Your account has been created!
          </div>
        {/if}

        <form
          class="space-y-6"
          method="POST"
          use:enhance={({ formData }) => {
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            if (password !== confirmPassword) return (error = 'Passwords do not match');

            return async ({ result }) => {
              let user = result.data?.user
              if(user) {
                profileStore.data = { name: user.name, email: user.email };
                await handleSignIn();
                goto('/auth/onboarding')
              }
              if (result.type === 'redirect') {
                goto(result.location);
              } else {
                await applyAction(result);
              }
            };
          }}
        >
          <div>
            <label for="name" class="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              bind:value={formData.name}
              required
              class="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              bind:value={formData.email}
              required
              class="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              bind:value={formData.password}
              required
              minlength="8"
              class="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              bind:value={formData.confirmPassword}
              required
              minlength="8"
              class="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/20 focus:outline-none focus:ring-0"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            class="w-full rounded-xl bg-white py-3 text-center font-semibold text-primary-600 shadow-lg transition-transform hover:scale-105"
          >
            Create Account
          </button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-primary-600 px-2 text-white">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onclick={() => signIn('google', { callbackUrl: '/auth/onboarding' })}
            class="mt-6 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-transform hover:scale-105"
          >
            <svg class="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p class="mt-6 text-center text-sm text-white">
          Already have an account?
          <a href="/auth/login" class="font-medium text-white hover:text-primary-200">
            Sign in
          </a>
        </p>
      </div>
    </div>
  </div>
</div>