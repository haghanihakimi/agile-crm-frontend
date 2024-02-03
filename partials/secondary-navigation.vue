<script setup>
import { useOrgsStore } from '~/server/store/organizations';
import { useProjectsStore } from '~/server/store/projects';

const organizations = useOrgsStore();
const projects = useProjectsStore();

const router = useRouter();

const boardLink = computed(() => {
  const orgUuid = organizations.activeOrganization.org_uuid;
  const projectUuid = (projects.activeProject && Object.keys(projects.activeProject).length > 0) ? projects.activeProject.project_uuid : '';

  return `/board/${orgUuid}/${projectUuid}`;
});

</script>

<template>
    <div class="w-full bg-mystic-midnight select-none sticky top-[80px] right-0 px-6 py-8 z-10">
        <div class="w-full rounded bg-light-ocean-blue p-4 border border-gray-800 shadow-md relative">
            <ul>
                <li class="inline-block">
                    <NuxtLink :to="`/dashboard/${organizations.activeOrganization.org_uuid}`" class="inline-block text-base font-medium tracking-wide px-4 py-2 text-gray-300 relative group">
                        <p :class="`block w-fit relative ${router.currentRoute.value.name === 'dashboard-org' ? 'text-tranquility' : ''}`">
                            Overview
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-tranquility bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li>
                <li class="inline-block">
                    <NuxtLink :to="boardLink" class="inline-block text-base font-medium tracking-wide px-4 py-2 text-gray-300 relative group">
                        <p :class="`block w-fit relative ${(router.currentRoute.value.name === 'board-org-project' || router.currentRoute.value.name === 'board-org') ? 'text-tranquility' : ''}`">
                            Board
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-tranquility bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="postcss" scoped>
div.ant-popover-inner {
    background-color: #072e33 !important;
}
</style>