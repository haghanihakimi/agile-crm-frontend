<script setup>
import { ref } from 'vue';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const props = defineProps({
    tasks: {
        type: Array,
    },
})

const attributes = ref([]);
const dayjs = useDayjs();

const formattedTasks = ref([]);

onMounted(() => {
    props.tasks.forEach((task) => {
        attributes.value.push({
            color: 'green',
            dot: true,
            dates: new Date(dayjs(task.due_date).format('YYYY'), dayjs(task.due_date).format('MM') - 1, dayjs(task.due_date).format('DD')),
            popover: {
                label: task.description,
                visibility: 'click'
            }
        })
    })
});

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