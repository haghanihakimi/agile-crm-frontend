<script setup>
import boardVue from "~/layouts/board/index.vue";
import { useProfilesStore } from "~/server/store/profiles";
import useTasks from '~/composables/tasks';
import useProjects from "~/composables/projects";

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
const { getTasks } = useTasks();
const { currentProject } = useProjects();

onMounted(async () => {
   await currentProject().then(async () => { await getTasks() })
})
</script>

<template>
    <div class="w-full bg-mystic-midnight relative">
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