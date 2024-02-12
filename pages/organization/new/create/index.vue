<script setup>
import { ref } from 'vue';
import createOrganization from '~/partials/create-organization.vue';
import { usePopupsStore } from '~/server/store/popups';
import useInvitations from '~/composables/invitations';
import useOrganizations from '~/composables/organizations';

useHead({
    title: 'Agile - Create Organization',
    meta: {
        name: 'Agile App',
        content: 'Create New Organization Invitation',
        key: 'Organization-Creation',
    }
})
definePageMeta({
    middleware: [
        'csrf',
        'auth',
    ],
});

const popups = usePopupsStore();
const { getInvitations } = useInvitations();
const { getCurrentOrganization } = useOrganizations();

onMounted(() => {
    getInvitations()
        .then(async () => {
            await getCurrentOrganization();
        })
        .finally(() => {
            popups.toggleOrganizationPopup(true);
        });
})
</script>

<template>
    <div class="w-full relative py-12 px-4">
        <NuxtLoadingIndicator />
        <createOrganization />
    </div>
</template>
<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>