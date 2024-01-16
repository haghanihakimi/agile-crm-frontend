<script setup>
import { ref } from 'vue';
import { usePopupsStore } from '~/server/store/popups';
import { useTasksStore } from '~/server/store/tasks';
import { useMemberstore } from '~/server/store/members';
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';
import priorityMenu from '~/partials/priority-menu.vue';
import taskStatusMenu from '~/partials/task-status-menu.vue';
import datePicker from './date-picker.vue';
import commentsSection from './comments-section.vue';
import useComments from '~/composables/comments';
import fileUpload from '~/partials/file-upload.vue';
import useTasks from '~/composables/tasks';

const dayjs = useDayjs();
const popups = usePopupsStore();
const tasks = useTasksStore();
const members = useMemberstore();
const { updateTask } = useTasks();
const { postComment } = useComments();

const uploadingFilesDone = ref(false);
const assignees = ref({
    mode: 'tags',
    value: [],
    closeOnSelect: false,
    options: [],
    placeholder: 'Assign task to...',
    searchable: true,
    createOption: true
});

onMounted(() => {
    tasks.refreshStatuses();
    tasks.refreshPriorities();
    members.orgMembers.map((member) => assignees.value.options.push({
        value: member.email,
        label: `${member.firstname} ${member.lastname}`,
    }))
    tasks.selectedTask.members.map((member) => assignees.value.value.push(member.users.email))

    tasks.selectedTask.statuses.map((status) => tasks.setStatuses(status));
    tasks.selectedTask.priorities.map((priority) => tasks.setPriorities(priority));
})
</script>

<template>
    <div class="w-full h-full bg-mystic-midnight bg-opacity-30 fixed top-0 left-0 z-40">
        <div
            class="w-full max-w-3xl h-full overflow-auto relative border-l border-gray-700 float-right bg-light-ocean-blue shadow-lg animate-popupFade">
            <form method="POST" class="w-full relative"
                @submit.prevent="uploadingFilesDone = false; updateTask(assignees.value).then(() => { uploadingFilesDone = true });">
                <div
                    class="w-full border-b border-gray-700 p-4 sticky top-0 bg-light-ocean-blue flex flex-row justify-between items-center z-10">
                    <h3 class="w-full text-base font-bold text-gray-300 flex flex-col gap-0">
                        {{ tasks.selectedTask.title }}
                        <span class="text-xs text-gray-500 font-normal">
                            Edited at {{ dayjs(tasks.selectedTask.edits[0].updated_at).format('MMM DD, YYYY - HH:mm') }} by
                            <u>
                                {{ `${tasks.selectedTask.edits[0].users.firstname}
                                                                ${tasks.selectedTask.edits[0].users.lastname}` }}
                            </u>
                        </span>
                    </h3>
                    <a-button type="ghost" htmlType="button" @click="popups.toggleDeleteTaskPopup(true)"
                        :disabled="tasks.updatingTask"
                        class="w-fit p-0 m-0 mr-4 flex items-center justify-center text-base font-bold text-red-500">
                        Delete
                    </a-button>
                    <a-button type="ghost" htmlType="submit" :disabled="tasks.updatingTask"
                        class="w-fit p-0 m-0 mr-4 flex items-center justify-center bg-light-ocean-blue text-base font-bold text-tranquility transition duration-120 hover:text-serene-skyline">
                        Save
                    </a-button>
                    <a-button type="ghost" :disabled="tasks.updatingTask"
                        class="w-7 h-7 p-0 m-0 flex items-center justify-center bg-light-ocean-blue"
                        @click="popups.toggleEditTaskPopup(false); tasks.getSelectedTask({})">
                        <Icon name="heroicons:x-mark-solid" class="text-xl text-gray-300" />
                    </a-button>
                </div>

                <div class="w-full relative p-4 flex flex-col gap-8 z-0">
                    <!-- assignees -->
                    <label for="assignees" id="editTaskAssignees"
                        class="w-full text-base font-medium text-gray-400 flex flex-col gap-1">
                        Assignees
                        <Multiselect id="assignees" v-model="assignees.value" v-bind="assignees"
                            :disabled="tasks.updatingTask">
                        </Multiselect>
                    </label>


                    <!-- Due date -->
                    <label for="dueDate"
                        class="w-full text-base font-medium text-gray-400 flex flex-col gap-1 justify-start items-start">
                        Due Date
                        <datePicker :currentDate="tasks.selectedTask.due_date" />
                    </label>
                    <!-- task title -->
                    <label for="title"
                        class="w-full text-base font-medium text-gray-400 flex flex-col gap-1 justify-start items-start">
                        Title
                        <input type="text" v-model="tasks.selectedTask.title" :disabled="tasks.updatingTask"
                            class="w-full max-h-[400px] resize-none rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none"
                            id="title" cols="30" rows="10" />
                    </label>
                    <!-- Description -->
                    <label for="description"
                        class="w-full text-base font-medium text-gray-400 flex flex-col gap-1 justify-start items-start">
                        Description
                        <textarea v-model="tasks.selectedTask.description" :disabled="tasks.updatingTask"
                            class="w-full max-h-[400px] resize-none rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none"
                            id="description" cols="30" rows="10"></textarea>
                    </label>
                    <!-- Task priority, task status & task privacy -->
                    <div class="w-full relative flex flex-col gap-2">
                        <label class="w-full text-base font-medium text-gray-400">
                            Task Status, Priority & Privacy
                        </label>
                        <div class="w-full relative flex flex-row gap-2">
                            <!-- Status box -->
                            <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                                <taskStatusMenu />
                            </div>
                            <!-- Priority box -->
                            <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                                <priorityMenu />
                            </div>
                            <!-- task privacy -->
                            <div class="w-fit h-auto flex flex-row items-center justify-start gap-2">
                                <label for="privacy"
                                    class="text-md text-gray-300 font-medium flex items-center justify-between gap-2 cursor-pointer select-none">
                                    <span
                                        class="w-5 h-5 rounded p-0 m-0 relative flex justify-center items-center bg-deep-ocean-blue border border-gray-700 relative block">
                                        <input type="checkbox" class="invisible hidden opacity-0" id="privacy"
                                            v-model="tasks.selectedTask.private">
                                        <Icon name="heroicons:check-20-solid" v-if="tasks.selectedTask.private"
                                            class="absolute -left-[5px] right-0 mx-auto text-3xl text-tranquility transition duration-120" />
                                    </span>
                                    Privacy
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- Attached files -->
                    <fileUpload :uploaded-files="tasks.selectedTask.files" :uploading-files-done="uploadingFilesDone" />

                    <!-- Comments section -->
                    <div class="w-full relative">
                        <span class="text-base font-medium text-gray-400 block">
                            Comments
                        </span>
                        <commentsSection :comments="tasks.selectedTask.comments"
                            v-if="tasks.selectedTask.comments && tasks.selectedTask.comments.length > 0" />
                        <span v-else class="text-gray-500 text-sm px-2">
                            No comments...
                        </span>
                    </div>
                </div>
            </form>

            <!-- Write new comment text input area -->
            <form method="POST" @submit.prevent="postComment()"
                class="w-full sticky bottom-0 p-4 inline-flex flex-col justify-between items-end bg-light-ocean-blue gap-2">
                <textarea placeholder="Write comment..." v-model="tasks.newComment" :disabled="tasks.postingComment"
                    class="w-full max-h-[90px] resize-none rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-75"
                    cols="30" rows="10"></textarea>
                <a-button type="ghost" :disabled="tasks.newComment.length <= 0 || tasks.postingComment" htmlType="submit"
                    class="w-fit text-sm font-medium rounded p-2 flex justify-center items-center text-base bg-tranquility disabled:opacity-50">
                    Comment
                </a-button>
            </form>
        </div>
    </div>
</template>
<style lang="postcss">
#editTaskAssignees .multiselect {
    @apply bg-deep-ocean-blue border-none shadow-none ml-0 max-h-[38px] shadow-md
}

#editTaskAssignees .multiselect-tag {
    @apply bg-tranquility
}

#editTaskAssignees .multiselect-tags-search {
    background-color: transparent !important;
    @apply rounded ring-0 outline-none text-gray-300
}

#editTaskAssignees .multiselect-search {
    background-color: transparent !important;
    @apply text-gray-300
}

#editTaskAssignees .multiselect-multiple-label {
    @apply text-gray-300;
}

#editTaskAssignees .multiselect-dropdown {
    @apply bg-deep-ocean-blue border border-gray-700 shadow-md overflow-auto
}

#editTaskAssignees .multiselect-options li {
    @apply bg-deep-ocean-blue border-b border-gray-700 text-gray-300 hover:bg-light-ocean-blue last:border-none
}

#editTaskAssignees .multiselect-no-results {
    @apply bg-deep-ocean-blue border-none text-gray-500 shadow-md
}
</style>