<script setup>
import { ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import { usePopupsStore } from '~/server/store/popups';
import { useTasksStore } from '~/server/store/tasks';
import Loading from "~/assets/images/loading.json";
import createTask from '~/partials/create-task.vue';
import createProject from '~/partials/create-project.vue';
import inviteMembers from '~/partials/invite-members.vue';
import createOrganization from '~/partials/create-organization.vue';
import editProject from '~/partials/edit-project.vue';
import editTask from '~/partials/edit-task.vue';
import deleteProject from '~/partials/delete-project.vue';
import deleteTask from '~/partials/delete-task.vue';
import deleteCommentVue from '~/partials/delete-comment.vue';
import priorityOptions from '~/partials/priority-options.vue';
import sidebarVue from "~/partials/sidebar.vue";
import topHeader from "~/partials/top-header.vue";
import secondaryNavigationVue from "~/partials/secondary-navigation.vue";
import calendar from "~/partials/calendar.vue";
import taskStatus from '~/partials/task-status.vue';
import profileCard from '~/partials/profile-card.vue';

const newTaskRow = ref(null);
const popups = usePopupsStore();
const tasks = useTasksStore();
const dayjs = useDayjs();
const router = useRouter();
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

            <!-- Create project popup -->
            <createProject v-if="popups.newProjectVis" />

            <!-- Create new task popup -->
            <createTask v-if="popups.newTaskPopup" />

            <createOrganization v-if="popups.newOrganizationVis" />

            <editProject v-if="popups.editProjectPopup" />

            <deleteProject v-if="popups.deleteProjectPopup" />

            <deleteTask v-if="popups.deleteTaskPopup" />

            <editTask v-if="popups.editTaskPopup" />

            <deleteCommentVue v-if="popups.deleteCommentPopup.status" />

            <profileCard v-if="popups.userProfilePopup.status" />

            <div class="w-full px-6 py-2 relative">
                <div class="w-full flex flex-row gap-2 relative">
                    <!-- List of tasks container -->
                    <div class="w-full relative flex flex-col gap-4">
                        <!-- Todo tasks list -->
                        <div class="w-full relative bg-deep-ocean-blue py-3 px-8 rounded border border-gray-800"
                            ref="newTaskRow"
                            v-if="!tasks.loadingTodoTasks && (tasks.todoTasks && tasks.todoTasks.length > 0)">
                            <inviteMembers />
                            <priorityOptions />
                            <taskStatus />
                            <!-- heading container -->
                            <div class="w-full flex flex-row justify-between items-center">
                                <h2 class="capitalize text-base font-bold text-gray-300">
                                    To Do Tasks
                                </h2>
                                <div class="w-auto shrink-0" v-if="router.currentRoute.value.params.project">
                                    <a-button type="button" @click="popups.toggleNewTaskPopup(true)"
                                        class="w-10 h-10 rounded-full bg-emerald-splash p-0 m-0 hover:bg-emerald-splash flex justify-center items-center shadow-md">
                                        <Icon name="heroicons:plus-20-solid" class="text-md text-gray-300" />
                                    </a-button>
                                </div>
                            </div>

                            <!-- todo tasks table -->
                            <div class="h-auto relative py-4 select-none"
                                v-if="tasks.todoTasks && tasks.todoTasks.length > 0">
                                <table class="w-full text-sm text-left text-gray-300 rounded shadow-md">
                                    <thead class="text-xs text-gray-300 uppercase bg-mystic-midnight text-center">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 rounded-tl">
                                                Task Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Due Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Assignees
                                            </th>
                                            <th scope="col" class="px-6 py-3 rounded-tr">
                                                Priority
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center">
                                        <tr class="bg-light-ocean-blue cursor-pointer select-none"
                                            v-for="task in tasks.todoTasks" :key="task.id">
                                            <th scope="row"
                                                @click="tasks.getSelectedTask(task); popups.toggleEditTaskPopup(true)"
                                                class="px-6 py-4 font-medium text-gray-300 whitespace-nowrap select-none">
                                                <span>
                                                    {{ task.title }}
                                                </span>
                                            </th>
                                            <td @click="tasks.getSelectedTask(task); popups.toggleEditTaskPopup(true)"
                                                class="px-6 py-4 text-center select-none">
                                                <span>
                                                    {{ dayjs(task.due_date).format('MMM DD, YYYY - HH:mm') }}
                                                </span>
                                            </td>
                                            <td @click="tasks.getSelectedTask(task); popups.toggleEditTaskPopup(true)"
                                                class="px-6 py-4 select-none">
                                                <span>
                                                    {{ task.statuses.find(status => status.is_selected).name }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 cursor-pointer profile-users select-none">
                                                <ClientOnly>
                                                    <a-avatar-group :max-count="3" max-popover-trigger="click" size="medium"
                                                        :max-style="{ color: '#ffffff', backgroundColor: '#0F9690', cursor: 'pointer' }">
                                                        <a-tooltip placement="top" v-for="member in task.members"
                                                            :key="member.users.id"
                                                            :title="`${member.users.firstname} ${member.users.lastname}`">
                                                            <a-avatar :src="member.users.image" :gap="1"
                                                                style="background-color: #0C7075">
                                                                <template #icon>
                                                                    <AntDesignOutlined />
                                                                </template>
                                                            </a-avatar>
                                                        </a-tooltip>
                                                    </a-avatar-group>
                                                </ClientOnly>
                                            </td>
                                            <td @click="tasks.getSelectedTask(task); popups.toggleEditTaskPopup(true)"
                                                class="px-6 py-4 tracking-wide select-none">
                                                {{ task.priorities.find(priority => priority.is_selected).name }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 v-else class="text-lg text-gray-400 font-bold text-center p-4">
                                No tasks found!
                            </h2>
                        </div>

                        <h2 v-if="!router.currentRoute.value.params.project"
                            class="text-lg text-gray-400 font-bold text-center p-4">
                            Select or create a project
                        </h2>

                        <a-button type="button" @click="popups.toggleNewTaskPopup(true)"
                            v-if="(tasks.todoTasks && tasks.todoTasks.length <= 0) && router.currentRoute.value.params.project"
                            class="w-fit mx-auto rounded-full text-base font-bold px-4 text-serene-skyline">
                            Create a task
                        </a-button>

                        <div role="status" class="w-full relative flex justify-center items-center flex-col"
                            v-if="tasks.loadingTodoTasks">
                            <ClientOnly>
                                <Vue3Lottie :animationData="Loading" :height="160" :width="160" :loop="true"
                                    :autoPlay="true" :speed="1" />
                            </ClientOnly>
                        </div>
                    </div>

                    <!-- Calendar -->
                    <div v-if="tasks.todoTasks.length > 0" class="w-full max-w-[512px] hidden 2xl:block">
                        <calendar :tasks="tasks.todoTasks" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style lang="postcss">
.no-arrow::-webkit-inner-spin-button,
.no-arrow::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.ant-popover-inner,
.ant-popover-arrow::before {
    background: #063537 !important;
}
</style>