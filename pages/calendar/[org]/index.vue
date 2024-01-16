<script setup>
import calendarVue from "~/layouts/calendar/index.vue";
import { useProfilesStore } from "~/server/store/profiles";
useHead({
    title: 'Agile - Calendar',
    meta: {
        name: 'Agile App',
        content: 'Agile App Calendar',
        key: 'Dashboard-Calendar',
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
        <calendarVue v-if="profiles.auth" />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>