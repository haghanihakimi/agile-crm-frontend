<script setup>
import settings from "~/layouts/settings/index.vue";
import { useProfilesStore } from "~/server/store/profiles";
useHead({
    title: 'Agile - Tasks Board',
    meta: {
        name: 'Agile App',
        content: 'Agile App tasks board',
        key: 'Dashboard-board',
    }
})

definePageMeta({
    middleware: [
        'csrf',
        'auth',
    ],
});

const profiles = useProfilesStore();

</script>

<template>
    <div class="w-full relative">
        <NuxtLoadingIndicator />
        <settings v-if="profiles.auth" />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>