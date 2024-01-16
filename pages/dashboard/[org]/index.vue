<script setup>
import dashboardVue from "~/layouts/dashboard/index.vue";
import { useProfilesStore } from "~/server/store/profiles";
useHead({
    title: 'Agile - Dashboard',
    meta: {
        name: 'Agile App',
        content: 'Agile App dashboard',
        key: 'Dashboard',
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
        <dashboardVue v-if="profiles.auth" />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>