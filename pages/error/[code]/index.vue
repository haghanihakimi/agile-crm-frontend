<script setup>
import errorsVue from '~/layouts/errors/404Error.vue';

useHead({
    title: 'Agile - Tasks Board',
    meta: {
        name: 'Agile App',
        content: 'Agile App tasks board',
        key: 'Dashboard-board',
    }
})
</script>

<template>
    <div class="w-full relative">
        <NuxtLoadingIndicator />
        <errorsVue />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>