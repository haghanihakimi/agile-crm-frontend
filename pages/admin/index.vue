<script setup>
import adminConsole from '~/layouts/admin/console.vue'
import { useProfilesStore } from "~/server/store/profiles";

useHead({
    title: 'Agile - Admin Console',
    meta: {
        name: 'Agile App',
        content: 'Agile App Admin Console',
        key: 'admin-console',
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
        <adminConsole v-if="profiles.auth" />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>