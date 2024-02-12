<script setup>
import { ref, computed } from 'vue';
import priorityMenu from './priority-menu.vue';
import taskStatusMenu from './task-status-menu.vue';
import timeframes from './timeframes.vue';
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';
import { useTasksStore } from '~/server/store/tasks';
import { useMemberstore } from '~/server/store/members';
import useTasks from '~/composables/tasks';
import { usePopupsStore } from '~/server/store/popups';

const popups = usePopupsStore();
const members = useMemberstore();
const tasks = useTasksStore();
const { createNewTask } = useTasks();

const assignees = ref({
    mode: 'tags',
    value: [],
    closeOnSelect: false,
    options: [],
    placeholder: 'Assign task to...',
    searchable: true,
    createOption: true
})

const newTaskData = ref({
    name: '',
    taskAssignees: members.projectAssignees.value,
    description: '',
    priority: tasks.priorities,
    status: tasks.status,
    privacy: false,
});

const createTask = (val, taskAssignees) => {
    createNewTask(val, taskAssignees).finally(() => {
        if (tasks.messages.length <= 0) {
            newTaskData.value.name = ''
            newTaskData.value.description = ''
            newTaskData.value.privacy = false
            members.projectAssignees.value = []
            tasks.priorities = [
                { "title": "Low", 'selected': true },
                { "title": "Medium", 'selected': false },
                { "title": "High", 'selected': false },
            ];
        }
    });
}

onMounted(() => {
    members.orgMembers.map((member, i) => assignees.value.options.push({
        value: member.users.email,
        label: `${member.users.firstname} ${member.users.lastname}`,
    }))
})
</script>

<template>
    <div v-if="popups.newTaskPopup"
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <div class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade">
            <!-- popup title & control -->
            <div class="w-full flex flex-row justify-between items-center p-4">
                <!--  -->
                <h2 class="w-full relative text-md tracking-wide font-bold text-gray-300">
                    New Task
                </h2>
                <a-button type="button" @click="popups.toggleNewTaskPopup(false)"
                    class="w-8 h-8 shrink-0 m-0 p-0 rounded bg-light-ocean-blue rounded border-none ring-0 flex items-center justify-center">
                    <Icon name="heroicons:x-mark" class="text-lg text-gray-300" />
                </a-button>
            </div>

            <!--  -->
            <form class="w-full flex flex-col gap-4 p-4" id="newtaskInputs" method="POST"
                @submit.prevent="createTask(newTaskData, assignees)">
                <input type="text" placeholder="Task Name" v-model="newTaskData.name"
                    class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />

                <div class="w-full flex flex-row items-center justify-start">
                    <Multiselect v-model="assignees.value" v-bind="assignees"></Multiselect>
                </div>

                <textarea v-model="newTaskData.description"
                    class="w-full min-h-[180px] max-h-[300px] resize-none rounded text-base tracking-wider font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none"
                    placeholder="Task Description..."></textarea>
                <div class="w-full relative flex flex-row gap-2">
                    <!-- Status box -->
                    <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                        <taskStatusMenu />
                    </div>
                    <!-- Priority box -->
                    <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                        <priorityMenu />
                    </div>
                    <!-- timeframe -->
                    <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                        <timeframes />
                    </div>
                    <!-- task privacy -->
                    <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                        <label for="privacy"
                            class="text-md text-gray-300 font-medium flex items-center justify-between gap-2 cursor-pointer select-none">
                            <span
                                class="w-5 h-5 rounded p-0 m-0 relative flex justify-center items-center bg-deep-ocean-blue border border-gray-700 relative block">
                                <input type="checkbox" class="invisible hidden opacity-0 peer" id="privacy"
                                    v-model="newTaskData.privacy">
                                <Icon name="heroicons:check-20-solid"
                                    class="absolute -left-[5px] right-0 mx-auto text-3xl text-tranquility transition duration-120 opacity-0 peer-checked:opacity-100" />
                            </span>
                            Privacy
                        </label>
                    </div>
                </div>

                <div class="w-full relative flex flex-row items-center justify-end">
                    <a-button type="ghost" htmlType="submit"
                        class="w-fit px-4 py-2 rounded m-0 flex justify-center items-center bg-emerald-splash text-gray-300 text-base font-medium disabled:opacity-50">
                        Create Task
                    </a-button>
                </div>

                <div class="w-full text-base font-medium text-red-500">
                    <ul v-if="Array.isArray(tasks.messages)">
                        <li v-for="message in tasks.messages" :key="message">
                            &cross;&nbsp;{{ message }}
                        </li>
                    </ul>
                    <p v-else>
                        {{ tasks.messages }}
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
<style lang="postcss">
#newtaskInputs .multiselect {
    @apply bg-deep-ocean-blue border-none shadow-none ml-0 max-h-[38px] shadow-md
}

#newtaskInputs .multiselect-tag {
    @apply bg-tranquility
}

#newtaskInputs .multiselect-tags-search {
    background-color: transparent !important;
    @apply rounded ring-0 outline-none text-gray-300
}

#newtaskInputs .multiselect-search {
    background-color: transparent !important;
    @apply text-gray-300
}

#newtaskInputs .multiselect-multiple-label {
    @apply text-gray-300;
}

#newtaskInputs .multiselect-dropdown {
    @apply bg-deep-ocean-blue border border-gray-700 shadow-md overflow-auto
}

#newtaskInputs .multiselect-options li {
    @apply bg-deep-ocean-blue border-b border-gray-700 text-gray-300 hover:bg-light-ocean-blue last:border-none
}

#newtaskInputs .multiselect-no-results {
    @apply bg-deep-ocean-blue border-none text-gray-500 shadow-md
}
</style>