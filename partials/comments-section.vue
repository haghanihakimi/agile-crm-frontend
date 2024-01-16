<script setup>
import { ref } from 'vue';
import commentsMenu from './comments-menu.vue';
import { useProfilesStore } from '~/server/store/profiles';
import useComments from '~/composables/comments';

const dayjs = useDayjs();
const profile = useProfilesStore();
const emit = defineEmits(['toggleEdit']);
const isCommentEditable = ref(false);
const editedComment = ref('');
const editingIndex = ref(null);
const { saveComment } = useComments();

const props = defineProps({
    comments: {
        type: Array,
        default: [],
    },
});

const startEditing = (index, commentContent) => {
    isCommentEditable.value = true;
    editedComment.value = commentContent;
    props.comments.forEach((comment, i) => {
        comment.editing = i === index;
    });
    editingIndex.value = index;
};

const saveEditedComment = (id, comment) => {
    saveComment(id, comment).then(() => {
        isCommentEditable.value = false;
    });
}

</script>

<template>
    <div class="w-full relative">
        <div class="block py-2 flex flex-col gap-3">
            <div class="flex gap-0 w-full group" v-for="(comment, i) in props.comments" :key="i">
                <div
                    :class="`w-fit inline-flex justify-center ${isCommentEditable ? 'items-start' : 'items-center'} gap-1 shrink-0`">
                    
                    <!-- Commenter user profile image section -->
                    <NuxtImg :src="comment.users.image"
                        class="w-8 h-8 rounded-full object-cover inline-block mr-1 select-none shrink-0" />

                    <!-- Comment date & time section -->
                    <p class="text-sm font-bold text-gray-200 tracking-wide inline-flex flex-col gap-0 shrink-0">
                        {{ `${comment.users.firstname} ${comment.users.lastname}` }}&nbsp;-&nbsp;
                        <a-tooltip placement="top">
                            <template #title>
                                <span class="text-sm font-medium text-gray-300 select-none">
                                    {{ dayjs(comment.created_at).format('MMM DD, YYYY - HH:mm') }}
                                </span>
                            </template>
                            <span class="text-xs font-normal text-gray-500">
                                {{ dayjs(comment.created_at).format('MMM DD, YYYY') }}
                            </span>
                        </a-tooltip>
                    </p>

                    <!-- Edit comment text input box section -->
                    <div v-show="isCommentEditable && i === editingIndex" class="w-full inline-flex flex-col gap-0">
                        <textarea placeholder="Write comment..." v-model="editedComment"
                            class="w-full max-h-[60px] min-w-[400px] resize-none rounded text-sm tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none"
                            cols="30" rows="10"></textarea>
                        <div class="w-full flex flex-row gap-0">
                            <a-button type="ghost" @click="isCommentEditable = false"
                                class="bg-light-ocean-blue p-0 text-xs text-gray-500 w-fit px-2 rounded-none">
                                Cancel
                            </a-button>
                            <a-button type="ghost" @click="saveEditedComment(comment.comment_uuid, editedComment)"
                                class="bg-light-ocean-blue p-0 text-xs font-bold text-tranquility w-fit px-2 rounded">
                                Save
                            </a-button>
                        </div>
                    </div>
                </div>

                <!-- Comment contents/text section -->
                <p class="text-sm font-medium text-gray-300 inline-block"
                    v-show="!isCommentEditable || i !== editingIndex || !comment.editing">
                    {{ comment.comment }}
                </p>

                <!-- Comment-menu with 3 dots section -->
                <commentsMenu :id="comment.comment_uuid" v-if="comment.user_id === profile.profile.id"
                    @toggleEdit="startEditing(i, comment.comment); emit('toggleEdit', 'good')"
                    :editableComment="isCommentEditable" />
            </div>
        </div>
    </div>
</template>