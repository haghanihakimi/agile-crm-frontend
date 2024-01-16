<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';
import { useTasksStore } from '~/server/store/tasks';

const taskStatusRef = ref(null);
const taskStatusVis = ref(false);
const popups = usePopupsStore();
const tasks = useTasksStore();

onClickOutside(taskStatusRef,
    () => {
        taskStatusVis.value = false
    })
</script>

<template>
    <div class="w-full relative cursor-pointer z-10" ref="taskStatusRef">
        <a-tooltip placement="bottom">
            <template #title>
                <span>Status: Processing</span>
            </template>
            <a-button type="button" @click="taskStatusVis = true"
                class="block w-8 h-8 p-0 m-0 relative flex justify-center items-center text-base font-medium text-gray-300 bg-deep-ocean-blue rounded border border-gray-700">
                <span v-if="taskStatusVis"
                    class="w-0 h-0 animate-popupFade border-l-[10px] border-l-transparent border-b-[10px] border-b-deep-teal border-r-[10px] rotate-180 border-r-transparent absolute -top-[14px] left-0 right-0 mx-auto z-10">
                    &nbsp;
                </span>
                <Icon name="pajamas:status" class="text-xl font-medium text-gray-300" />
            </a-button>
        </a-tooltip>
        <div v-if="taskStatusVis"
            class="w-full min-w-[280px] animate-popupFade absolute rounded bg-deep-teal left-0 -top-[215px] mx-auto border border-gray-800 shadow-md">
            <ul>
                <li v-for="(status, index) in tasks.status" :key="index" @click="tasks.selectStatus(status)"
                    class="block text-base text-gray-300 rounded text-left py-3 px-4 transition duration hover:bg-deep-ocean-blue">
                    <p class="w-full flex flex-row justify-start items-center gap-2">
                        <Icon name="heroicons:check-20-solid" class="text-lg text-gray-300" v-if="status.is_selected" />
                        {{ status.title }}
                    </p>
                </li>
            </ul>
            <div class="w-full flex justify-center items-center p-2">
                <a-button type="button" @click="popups.toggleTaskStatus(true)"
                    class="block w-full min-h-[42px] flex justify-center items-center text-base font-medium text-gray-300 bg-deep-ocean-blue rounded">
                    Edit Options
                </a-button>
            </div>
        </div>
    </div>
</template>