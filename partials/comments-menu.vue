<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';

const menuRef = ref(null);
const isOpen = ref(false);
const emit = defineEmits(['toggleEdit']);
const popups = usePopupsStore();
const props = defineProps({
    id: {
        type: String,
        default: '',
    },
    editableComment: {
        type: Boolean,
        default: false,
    }
});

const toggleEdit = () => {
    emit('toggleEdit');
}

onClickOutside(menuRef,
    () => {
        isOpen.value = false;
    });

</script>

<template>
    <div class="w-fit relative px-2" v-if="!props.editableComment">
        <a-button type="ghost" @click="isOpen = !isOpen"
            :class="`w-5 h-5 rounded-none bg-light-ocean-blue p-0 m-0 ${isOpen ? 'flex' : 'hidden'} justify-center items-center group-hover:flex`">
            <Icon name="heroicons:ellipsis-horizontal-20-solid" class="text-2xl text-gray-300" />
            <span v-if="isOpen && !props.editableComment"
                class="w-0 h-0 border-l-[6px] border-l-transparent border-b-[6px] border-b-slate-harbor border-r-[6px] rotate-0 border-r-transparent absolute -bottom-[5px] left-0 right-0 mx-auto z-10 group-last:rotate-180 group-last:-top-1">
                &nbsp;
            </span>
        </a-button>
        <div v-if="isOpen && !props.editableComment" ref="menuRef"
            class="w-full min-w-[180px] p-2 flex flex-col gap-2 rounded bg-slate-harbor absolute right-0 top-6 z-10 shadow-md  group-last:-top-[90px]">
            <a-button type="ghost" @click="toggleEdit();isOpen = false;"
                class="w-full rounded bg-slate-harbor text-left text-base font-medium text-gray-300 flex items-center justify-start py-0 px-1 gap-1">
                <Icon name="heroicons:pencil" class="text-base text-gray-300" />
                <span>
                    Edit
                </span>
            </a-button>
            <a-button type="ghost" @click="popups.toggleDeleteCommentPopup(true, props.id)"
                class="w-full rounded bg-slate-harbor text-left text-base font-medium text-gray-300 flex items-center justify-start py-0 px-1 gap-1">
                <Icon name="heroicons:trash" class="text-xl text-gray-300" />
                <span>
                    Delete
                </span>
            </a-button>
        </div>
    </div>
</template>