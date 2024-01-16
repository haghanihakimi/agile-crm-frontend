<script setup>
import { ref, reactive } from 'vue';
import { usePopupsStore } from '~/server/store/popups';
import useComments from '~/composables/comments';
import { useTasksStore } from '~/server/store/tasks';


const popups = usePopupsStore();
const { deleteComment } = useComments();
const tasks = useTasksStore();


</script>

<template>
    <div v-if="popups.deleteCommentPopup.status"
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <form method="POST" class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade p-4"
            @submit.prevent="deleteComment(popups.deleteCommentPopup.comment)">
            <div class="w-full felx flex-row justify-between items-center border-b border-gray-700">
                <h2 class="text-lg font-bold text-red-400 py-2">
                    Delete Comment
                </h2>
            </div>
            <p class="text-base font-medium text-gray-300 py-2">
                Are you sure you want to delete this comment?
            </p>
            <div class="w-full flex flex-row justify-end items-center gap-2">
                <a-button type="ghost" htmlType="button" @click="popups.toggleDeleteCommentPopup(false, '')" :disabled="tasks.deletingComment"
                    class="w-fit h-auto flex justify-center items-center p-2 rounded bg-transparent text-gray-400 text-base font-medium disabled:opacity-50">
                    Cancel
                </a-button>
                <a-button type="ghost" htmlType="submit" :disabled="tasks.deletingComment"
                    class="w-fit h-auto flex justify-center items-center p-2 rounded bg-transparent text-red-500 text-base font-medium disabled:opacity-50">
                    Delete
                </a-button>
            </div>
        </form>
    </div>
</template>