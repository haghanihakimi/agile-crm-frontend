<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';

const priorityRef = ref(null);
const priorityVis = ref(false);
const projectBudget = ref(0);
const popups = usePopupsStore();

onClickOutside(priorityRef,
    () => {
        if (projectBudget.value <= 0) {
            priorityVis.value = false
        }
    })
</script>

<template>
    <div class="w-full relative cursor-pointer z-10" ref="priorityRef">
        <a-tooltip v-if="!priorityVis" placement="top">
            <template #title>
                <span>Project Budget</span>
            </template>
            <a-button type="button" @click="priorityVis = true"
                class="block w-8 h-8 p-0 m-0 relative flex justify-center items-center text-sm font-medium text-gray-300 bg-deep-ocean-blue rounded border border-gray-700">
                <Icon name="material-symbols:attach-money" class="text-xl font-medium text-gray-300" />
            </a-button>
        </a-tooltip>
        <div v-if="priorityVis" class="w-full h-8 animate-popupFade rounded bg-deep-teal mx-auto border border-gray-800">
            <a-tooltip placement="top">
                <template #title>
                    <span>Project Budget</span>
                </template>
                <input type="number" placeholder="Budget" v-model="projectBudget"
                    class="w-fit max-w-[90px] h-8 no-arrow rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
            </a-tooltip>
        </div>
    </div>
</template>