<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';
import { useTasksStore } from '~/server/store/tasks';
import { useTimeframesStore } from '~/server/store/timeframes';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const priorityRef = ref(null);
const priorityVis = ref(false);
const tasks = useTasksStore();
const timeframesStore = useTimeframesStore();
const date = ref(new Date());

const props = defineProps({
    endingDate: {
        default: false,
        type: Boolean,
    },
});

onClickOutside(priorityRef,
    () => {
        priorityVis.value = false
    })
</script>

<template>
    <div id="timeframes-container" class="w-full relative cursor-pointer z-10">
        <a-tooltip placement="top">
            <template #title>
                <span>Due Date</span>
            </template>
            <div class="w-full flex flex-row gap-2 items-center relative rounded mx-auto border border-gray-700">
                <ClientOnly>
                    <DatePicker v-model="timeframesStore.startDate" mode="dateTime" :popover="false" :is-dark="true">
                        <template #default="{ togglePopover, inputValue, inputEvents }">
                            <div class="flex rounded overflow-hidden">
                                <button type="button"
                                    class="flex justify-center items-center px-2 bg-accent-100 hover:bg-accent-200 text-accent-700 border-r border-gray-700"
                                    @click="() => togglePopover()">
                                    <Icon name="heroicons:calendar-days" class="text-2xl text-gray-300" />
                                </button>
                                <input :value="inputValue" v-on="inputEvents"
                                    class="flex-grow px-2 py-1 bg-deep-ocean-blue text-gray-300 border-none rounded ring-0 focus:outline-none focus:ring-0" />
                            </div>
                        </template>
                    </DatePicker>
                </ClientOnly>
                <ClientOnly v-if="props.endingDate">
                    <DatePicker v-model="timeframesStore.endDate" mode="dateTime" :popover="false" :is-dark="true">
                        <template #default="{ togglePopover, inputValue, inputEvents }">
                            <div class="flex rounded overflow-hidden">
                                <button type="button"
                                    class="flex justify-center items-center px-2 bg-accent-100 hover:bg-accent-200 text-accent-700 border-r border-gray-700"
                                    @click="() => togglePopover()">
                                    <Icon name="heroicons:calendar-days" class="text-2xl text-gray-300" />
                                </button>
                                <input :value="inputValue" v-on="inputEvents"
                                    class="flex-grow px-2 py-1 bg-deep-ocean-blue text-gray-300 border-none rounded ring-0 focus:outline-none focus:ring-0" />
                            </div>
                        </template>
                    </DatePicker>
                </ClientOnly>
            </div>
        </a-tooltip>
    </div>
</template>
<style lang="postcss">
#timeframes-container .ant-collapse {
    @apply border-none;
}

#timeframes-container .ant-collapse-item {
    @apply border-none;
}

#timeframes-container .ant-collapse-content {
    @apply bg-transparent border-none;
}

#timeframes-container .ant-collapse-header-text {
    @apply text-base;
}

#timeframes-container .ant-collapse-header {
    @apply text-white;
}
</style>~/server/store/dateTime~/server/store/timeframes