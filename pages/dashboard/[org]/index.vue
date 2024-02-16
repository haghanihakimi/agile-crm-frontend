<script setup>
import dashboardVue from "~/layouts/dashboard/index.vue";
import { useProfilesStore } from "~/server/store/profiles";
import useTasks from '~/composables/tasks';
import useProjects from "~/composables/projects";
import useMembers from "~/composables/members";

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
const { getTotalTasks, getCompletedTasks, getOverdueTasks } = useTasks();
const { getTotalProjects } = useProjects();
const { getProjectMembers } = useMembers();

onMounted(async () => {
    await getTotalTasks();
    await getCompletedTasks();
    await getOverdueTasks();
    await getTotalProjects();
    await getProjectMembers();
})
</script>

<template>
    <div class="w-full relative">
        <NuxtLoadingIndicator />
        <dashboardVue />
    </div>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>