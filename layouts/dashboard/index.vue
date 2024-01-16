<script setup>
import { useMemberstore } from "~/server/store/members";
import sidebarVue from "~/partials/sidebar.vue";
import topHeader from "~/partials/top-header.vue";
import secondaryNavigationVue from "~/partials/secondary-navigation.vue";
import createOrganization from '~/partials/create-organization.vue';
import createProject from '~/partials/create-project.vue';
import inviteMembers from '~/partials/invite-members.vue';
import editProject from '~/partials/edit-project.vue';
import deleteProject from '~/partials/delete-project.vue';
import { usePopupsStore } from "~/server/store/popups";
import { useProjectsStore } from '~/server/store/projects';
import { useTasksStore } from '~/server/store/tasks';

const popups = usePopupsStore();
const members = useMemberstore();
const projects = useProjectsStore();
const tasks = useTasksStore();
</script>

<template>
    <main class="w-full h-screen flex flex-row gap-0 flex-nowrap relative overflow-hidden">
        <!-- Sidebar container -->
        <ClientOnly>
            <sidebarVue />
        </ClientOnly>

        <!-- Main content section  -->
        <div class="w-full h-screen flex flex-col gap-0 relative overflow-auto overflow-x-hidden">
            <!-- Top header section -->
            <topHeader />

            <!-- parts secondary navbar -->
            <secondaryNavigationVue />

            <createOrganization />

            <createProject />

            <editProject />

            <deleteProject />

            <inviteMembers />

            <div class="w-full px-8 py-2 relative">
                <div class="w-full select-none max-w-6xl mx-auto flex flex-row gap-4">

                    <div
                        class="w-full bg-deep-ocean-blue rounded flex flex-col justify-between p-2 gap-8 border border-gray-700 shadow-md">
                        <h3 class="w-full text-lg font-semibold text-gray-300 tracking-wide">
                            Completed Tasks
                        </h3>

                        <div class="w-full flex flex-row justify-between items-center text-gray-300">
                            <strong class="flex flex-col gap-0 text-sm shrink-0">
                                <span>{{ tasks.completedTasks }}/{{ tasks.totalTasks <= 9 ? `0${tasks.totalTasks}` :
                                    tasks.totalTasks }}</span>
                                        <span class="text-gray-400">Task count</span>
                            </strong>
                        </div>
                    </div>
                    <div
                        class="w-full bg-deep-ocean-blue rounded flex flex-col justify-between p-2 gap-8 border border-gray-700 shadow-md">
                        <h3 class="w-full text-lg font-semibold text-gray-300 tracking-wide">
                            Overdue Tasks
                        </h3>

                        <div class="w-full flex flex-row justify-between items-center text-gray-300">
                            <strong class="flex flex-col gap-0 text-sm shrink-0">
                                <span>{{ tasks.overdueTasks }}/{{ tasks.totalTasks <= 9 ? `0${tasks.totalTasks}` :
                                    tasks.totalTasks }}</span>
                                        <span class="text-gray-400">Task count</span>
                            </strong>
                        </div>
                    </div>
                    <div
                        class="w-full bg-deep-ocean-blue rounded flex flex-col justify-between p-2 gap-8 border border-gray-700 shadow-md">
                        <h3 class="w-full text-lg font-semibold text-gray-300 tracking-wide">
                            Projects
                        </h3>

                        <div class="w-full flex flex-row justify-between items-center text-gray-300">
                            <strong class="flex flex-col gap-0 text-sm shrink-0">
                                {{ projects.totalProjects < 10 ? `0${projects.totalProjects}` : projects.totalProjects }}
                                    Projects </strong>

                                    <a-button type="ghost" @click="popups.toggleNewProjectPopup(true)"
                                        class="transition duration-200 text-gray-300 text-base font-medium bg-deep-ocean-blue hover:text-tranquility">
                                        Create Project
                                    </a-button>
                        </div>
                    </div>
                    <div
                        class="w-full bg-deep-ocean-blue rounded flex flex-col justify-between p-2 gap-8 border border-gray-700 shadow-md">
                        <h3 class="w-full text-lg font-semibold text-gray-300 tracking-wide">
                            Members
                        </h3>

                        <div class="w-full flex flex-row justify-between items-center text-gray-300">
                            <strong class="flex flex-col gap-0 text-sm shrink-0" v-if="members.orgMembers">
                                {{ (members.orgMembers.length <= 1) ? `${members.orgMembers.length} Member` :
                                    `${members.orgMembers.length} Members` }} </strong>
                                    <strong class="flex flex-col gap-0 text-sm shrink-0" v-else>
                                        0 Members
                                    </strong>

                                    <a-button type="ghost" @click="popups.toggleMemberInvitation(true)"
                                        class="transition duration-200 text-gray-300 text-base font-medium bg-deep-ocean-blue hover:text-tranquility">
                                        Invite Members
                                    </a-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>