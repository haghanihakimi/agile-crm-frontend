<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';

const isOpen = ref(false);
const menuRef = ref(null);
const popups = usePopupsStore();

const props = defineProps({
    member: {
        type: Object,
    }
})

const openPopup = () => {
    popups.toggleRemoveOrgMemberPopup(
        props.member.users.id,
        props.member.memberable.id,
        props.member.users.firstname,
        props.member.users.lastname,
        true
    )
}

onClickOutside(menuRef,
    () => {
        isOpen.value = false;
    });

</script>

<template>
    <div class="w-fit relative px-2 shrink-0">
        <a-button type="ghost" @click="isOpen = !isOpen"
            :class="`w-5 h-5 rounded-none bg-deep-ocean-blue p-0 m-0 flex justify-center items-center group-hover:flex`">
            <Icon name="heroicons:ellipsis-horizontal-20-solid" class="text-2xl text-gray-300" />
            <span v-if="isOpen"
                class="w-0 h-0 border-l-[6px] border-l-transparent border-b-[6px] border-b-deep-teal border-r-[6px] rotate-0 border-r-transparent absolute -bottom-[5px] left-0 right-0 mx-auto z-10 group-last:rotate-180 group-last:-top-1">
                &nbsp;
            </span>
        </a-button>
        <div v-if="isOpen" ref="menuRef" @click="isOpen = false;"
            class="w-full min-w-[180px] animate-popupFade p-0 flex flex-col gap-0 rounded bg-deep-teal absolute right-0 top-6 z-10 shadow-md  group-last:-top-[90px]">
            <a-button type="ghost" @click="openPopup()"
                class="w-full rounded bg-deep-teal text-left text-base font-medium text-gray-300 flex items-center justify-start py-5 px-3 gap-1 transition duration-120 hover:bg-deep-ocean-blue">
                <Icon name="heroicons:user-minus" class="text-xl text-gray-300" />
                <span>
                    Remove Member
                </span>
            </a-button>
        </div>
    </div>
</template>