<script setup>
import { ref } from 'vue';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const attributes = ref([
    {
        key: 'today',
        color: 'green',
        dot: true,
        dates: new Date(),
        popover: {
            label: 'description',
            visibility: 'click'
        }
    },
]);

</script>

<template>
    <div id="board-vcalendar" class="w-full relative h-auto">
        <ClientOnly>
            <Calendar is-dark="true" expanded trim-weeks :rows="2" :attributes="attributes" />
        </ClientOnly>
    </div>
</template>
<style lang="postcss">
#board-vcalendar .vc-container {
    @apply bg-deep-ocean-blue
}

#board-vcalendar .vc-popover-content {
    @apply bg-mystic-midnight
}
</style>