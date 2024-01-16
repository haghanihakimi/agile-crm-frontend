<script setup>
import { ref } from 'vue';
import { usePopupsStore } from '~/server/store/popups';
import { useTasksStore } from '~/server/store/tasks';

const popups = usePopupsStore();
const tasks = useTasksStore();
</script>

<template>
    <div v-if="popups.priorityOptionsVis"
        class="w-full h-full animate-popupFade fixed top-0 left-0 bg-mystic-midnight bg-opacity-50 backdrop-blur z-50 p-4 flex justify-center items-center">
        <div class="w-full max-w-[720px] bg-light-ocean-blue shadow-lg p-4 rounded flex flex-col gap-4">
            <div class="w-full relative flex justify-between items-start border-b border-gray-700">
                <h2 class="py-2 text-lg font-bold text-gray-300 flex flex-col gap-0">
                    Priority Options
                </h2>
                <a-button type="button" @click="popups.togglePriorityOptions(false)"
                    class="w-7 h-7 bg-light-ocean-blue shrink-0 p-0 m-0 relative flex justify-center items-center">
                    <Icon name="heroicons:x-mark" class="text-xl text-gray-300" />
                </a-button>
            </div>
            <!-- Column options -->
            <div class="w-full relative flex flex-col mt-6">
                <!-- field title -->
                <div class="w-full max-h-[280px] overflow-auto flex flex-col gap-2">
                    <div v-for="(option, index) in tasks.priorities" :key="index"
                        class="w-full border-b border-gray-700 flex flex-row gap-1 justify-between items-center">
                        <input type="text" v-model="option.title"
                            class="w-full relative text-base font-medium text-gray-300 bg-transparent border-none ring-0 focus:ring-0 focus:outline-none" />
                        <a-button type="button" @click="tasks.removePriorityItem(option)"
                            class="w-7 h-7 bg-light-ocean-blue flex justify-center items-center p-0 m-0">
                            <Icon name="heroicons:x-mark" class="text-lg text-gray-300" />
                        </a-button>
                    </div>
                </div>
                <a-button type="button" @click="tasks.setPriorities({ 'title': `Option ${((tasks.priorities.length + 1) - 1) + 1}`, 'is_selected': false })"
                    class="w-fit h-7 px-2 py-0 m-0 text-gray-300 font-medium flex flex-row gap-0 justify-between items-center bg-light-ocean-blue">
                    <Icon name="heroicons:plus-small-20-solid" class="text-xl text-gray-300" />
                    <span>Add an option</span>
                </a-button>
            </div>
            <!-- Saving changes button container -->
            <div class="w-full h-auto flex justify-end items-center">
                <a-button type="button" @click="popups.togglePriorityOptions(false)"
                    class="w-fit h-10 m-0 p-2 flex justify-center items-center rounded bg-tranquility transition duration-150 text-mystic-midnight text-base font-medium">
                    Save Changes
                </a-button>
            </div>
        </div>
    </div>
</template>