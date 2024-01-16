<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import Animation404 from '~/assets/images/Animation - 1702499314199.json'


</script>

<template>
    <div class="w-full relative">
        <ClientOnly>
            <Vue3Lottie :animationData="Animation404" class="w-full max-w-2xl h-auto" :loop="true" :autoPlay="true" :speed="0.5" />
        </ClientOnly>
        <NuxtLink to="/" class="text-gray-500 text-center text-base block mx-auto flex items-center justify-center">
            <Icon name="heroicons:chevron-left-20-solid" class="text-xl text-gray-300" />
            Back Home
        </NuxtLink>
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>