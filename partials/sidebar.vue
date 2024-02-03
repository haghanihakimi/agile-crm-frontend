<script setup>
import { ref, watch } from 'vue';
import { usePopupsStore } from '~/server/store/popups';
import { useOrgsStore } from '~/server/store/organizations';
import { useProjectsStore } from '~/server/store/projects';
import { useMemberstore } from '~/server/store/members';

const sidebarAccordions = useCookie('sidebarAccordions', ['1', '2']);

const activeKey = ref(sidebarAccordions.value);
const popups = usePopupsStore();
const organizations = useOrgsStore();
const projects = useProjectsStore();
const members = useMemberstore();
const router = useRouter();


watch(activeKey, (newValue) => {
    sidebarAccordions.value = newValue;
});
</script>

<template>
    <div id="sidebar-container"
        class="w-full max-w-[250px] h-full select-none relative border-r border-gray-800 overflow-auto overflow-x-hidden">
        <!-- Logo and toggle button -->
        <div
            class="w-full text-gray-300 bg-mystic-midnight p-4 flex flex-row justify-between items-center grow sticky top-0 left-0">
            <NuxtLink to="/">
                <NuxtImg src="agile-crm.png" class="w-10 h-10" />
            </NuxtLink>
        </div>

        <!-- Menu items container -->
        <div class="w-full flex flex-col gap-4 text-pink-300">
            <a-collapse v-model:active-key="activeKey">
                <a-collapse-panel key="1" header="General">
                    <ul>
                        <li
                            class="block bg-transparent rounded transition duration-200 hover:bg-deep-ocean-blue group group">
                            <NuxtLink to="/dashboard"
                                class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 group-hover:text-tranquility">
                                <Icon name="heroicons:squares-2x2" class="text-xl p-0 m-0" />
                                <span>Dashboard</span>
                            </NuxtLink>
                        </li>
                        <li class="block bg-transparent rounded transition duration-200 hover:bg-deep-ocean-blue group">
                            <NuxtLink to="#"
                                class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 group-hover:text-tranquility">
                                <Icon name="heroicons:bell" class="text-xl p-0 m-0" />
                                <span>Notifications</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="Organization">
                    <ul>
                        <li @click="popups.toggleOrganizationPopup(true)"
                            class="block cursor-pointer bg-transparent rounded transition duration-200 hover:bg-deep-ocean-blue group">
                            <p
                                class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 group-hover:text-tranquility">
                                <Icon name="icon-park-outline:incoming" class="text-xl p-0 m-0 -rotate-90" />
                                <span>Requests</span>
                            </p>
                        </li>
                        <li class="block bg-transparent rounded transition duration-200 hover:bg-deep-ocean-blue group">
                            <button
                                class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 group-hover:text-tranquility">
                                <Icon name="octicon:project-24" class="text-xl p-0 m-0" />
                                <span>Projects</span>
                            </button>
                            <ul
                                v-if="projects.projects && projects.projects.length > 0 && projects.activeProject && !projects.loadingProjects">
                                <li class="px-6 py-0 block bg-transparent" v-for="(project, index) in projects.projects"
                                    :key="index">
                                    <div class="w-full relative flex flex-row justify-between items-center">
                                        <ClientOnly>
                                            <a-tooltip placement="right">
                                                <template #title>
                                                    <span>{{ project.title }}</span>
                                                </template>
                                                <NuxtLink
                                                    :to="`/board/${organizations.activeOrganization.org_uuid}/${project.project_uuid}`"
                                                    class="max-w-[150px] py-0 shrink-0 truncate bg-transparent text-gray-300 transition duration-200 bg-mystic-midnight hover:text-serene-skyline text-base flex items-center justify-start gap-1 rounded px-2 py-4 m-0">
                                                    <Icon
                                                        v-if="project.project_uuid === router.currentRoute.value.params.project"
                                                        name="heroicons:check-20-solid" class="text-lg shrink-0" />
                                                    <Icon v-else name="heroicons:chevron-right-20-solid"
                                                        class="text-lg shrink-0" />
                                                    {{ project.title }}
                                                </NuxtLink>
                                            </a-tooltip>
                                        </ClientOnly>
                                        <a-button type="ghost"
                                            @click="projects.getSelectedProject(project); popups.toggleEditProjectPopup(true)"
                                            class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 bg-mystic-midnight group-hover:bg-deep-ocean-blue">
                                            <Icon name="heroicons:pencil-20-solid" class="text-base text-gray-300" />
                                        </a-button>
                                    </div>
                                </li>
                            </ul>
                            <ul v-if="projects.loadingProjects" class="px-6">
                                <ClientOnly>
                                    <a-skeleton :loading="projects.loadingProjects" active></a-skeleton>
                                </ClientOnly>
                            </ul>
                        </li>
                        <!-- <li class="block bg-transparent rounded transition duration-200 hover:bg-deep-ocean-blue group">
                            <button
                                class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 group-hover:text-tranquility">
                                <Icon name="octicon:goal-24" class="text-xl p-0 m-0" />
                                <span>Goals</span>
                            </button>
                        </li> -->
                        <li class="block bg-transparent rounded transition duration-200 hover:bg-deep-ocean-blue group">
                            <button
                                class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 group-hover:text-tranquility">
                                <Icon name="heroicons:user-group" class="text-xl p-0 m-0" />
                                <span>Members</span>
                            </button>
                            <ul v-if="!members.loadingMembers">
                                <li class="px-6 block bg-transparent" v-for="(member, index) in members.orgMembers"
                                    :key="index">
                                    <NuxtLink
                                        class="text-base text-gray-300 flex flex-row gap-2 justify-start items-center p-3 transition duration-200 bg-mystic-midnight hover:text-serene-skyline group-hover:bg-deep-ocean-blue">
                                        <Icon name="heroicons:chevron-right-20-solid" class="text-lg" />
                                        {{ `${member.firstname} ${member.lastname}` }}
                                    </NuxtLink>
                                </li>
                            </ul>
                            <ul v-else class="px-6">
                                <ClientOnly>
                                    <a-skeleton :loading="members.loadingMembers" active></a-skeleton>
                                </ClientOnly>
                            </ul>
                        </li>
                    </ul>
                </a-collapse-panel>
            </a-collapse>
        </div>

        <!-- Invite members button -->
        <div class="w-full bg-mystic-midnight pt-4 mt-4 border-t border-gray-800 sticky bottom-0 z-10 p-4">
            <a-button type="button" @click="popups.toggleMemberInvitation(true); members.setInviteType('Organization')"
                class="w-full p-2 text-gray-300 bg-transparent rounded flex flex-row justify-center items-center gap-2 text-base font-medium">
                <Icon name="mingcute:invite-fill" class="text-xl" />
                <span>Invite Members</span>
            </a-button>
        </div>
    </div>
</template>
<style lang="postcss">
#sidebar-container .ant-collapse {
    @apply border-none;
}

#sidebar-container .ant-collapse-item {
    @apply border-none;
}

#sidebar-container .ant-collapse-content {
    @apply bg-transparent border-none;
}

#sidebar-container .ant-collapse-header-text {
    @apply text-base;
}

#sidebar-container .ant-collapse-header {
    @apply text-gray-300;
}
</style>