<script setup>
import boardVue from "~/layouts/board/index.vue";
import { useProfilesStore } from "~/server/store/profiles";
import useProjects from '~/composables/projects';
import { useProjectsStore } from "~/server/store/projects";
import { useOrgsStore } from "~/server/store/organizations";

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
        <boardVue v-if="profiles.auth" />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>