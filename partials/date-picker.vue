<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { useDateTimeStore } from '~/server/store/dateTime';

const props = defineProps({
    currentDate: {
        type: String,
        default: new Date(),
    },
});

const dateTime = useDateTimeStore();

onMounted(() => {
    dateTime.setDateTime(props.currentDate);
});

</script>

<template>
    <div id="board-datepicker" class="w-fit mx-auto relative min-h-[42px] ml-0">
        <ClientOnly>
            <DatePicker v-model="dateTime.dateTime" :popover="false"  mode="dateTime" is24hr>
                <template #default="{ togglePopover, inputValue, inputEvents }">
                    <div class="w-fit flex rounded overflow-hidden min-h-[42px]">
                        <input :value="inputValue" v-on="inputEvents" @click="() => togglePopover()"
                            placeholder="Due Date"
                            class="w-fit min-h-[42px] cursor-pointer text-center flex-grow px-2 py-1 w-full border border-gray-700 rounded-tr rounded-br text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue ring-transparent focus:ring-transparent focus:outline-none focus:border-gray-700" />
                    </div>
                </template>
            </DatePicker>
        </ClientOnly>
    </div>
</template>
<style lang="postcss">
#board-datepicker .vc-container {
    @apply bg-deep-ocean-blue
}

#board-datepicker .vc-popover-content {
    @apply border border-gray-700
}

#board-datepicker .vc-attached {
    @apply border-t border-gray-700
}

#board-datepicker .vc-time-header > span {
    @apply text-gray-300
}

#board-datepicker .vc-time-select-group {
    @apply bg-emerald-splash
}

#board-datepicker .vc-popover-content {
    @apply bg-mystic-midnight
}

#board-datepicker .vc-popover-caret {
    display: none !important;
}

#board-datepicker .vc-arrow:hover {
    @apply bg-emerald-splash
}

#board-datepicker .vc-arrow>svg {
    @apply text-gray-300
}

#board-datepicker .vc-weekday {
    @apply text-[#c5dafd]
}

#board-datepicker .vc-day-content {
    @apply text-gray-300
}

#board-datepicker .vc-highlight {
    @apply bg-tranquility
}

#board-datepicker .vc-highlight-content-solid {
    @apply text-mystic-midnight
}

#board-datepicker .vc-title>span {
    @apply text-gray-300
}</style>