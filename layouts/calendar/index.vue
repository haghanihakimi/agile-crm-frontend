<script setup>
import { ref, nextTick, watch, watchEffect } from 'vue';
import BtnGeneral from "~/components/buttons/general.vue";
import sidebarVue from "~/partials/sidebar.vue";
import topHeader from "~/partials/top-header.vue";
import createTask from '~/partials/create-task.vue';
import createProject from '~/partials/create-project.vue';
import inviteMembers from '~/partials/invite-members.vue';
import createOrganization from '~/partials/create-organization.vue';
import editProject from '~/partials/edit-project.vue';
import deleteProject from '~/partials/delete-project.vue';
import secondaryNavigationVue from "~/partials/secondary-navigation.vue";
import dayjs from 'dayjs';

import { useTasksStore } from '~/server/store/tasks';

const selectedYear = ref(dayjs().year());
const selectedMonth = ref(dayjs().month() + 1);
let dayNames = [];
let daysOfMonth = [];
let calendar = [];
let months = ref([]);
const tasks = useTasksStore();

const generateCalendar = (year) => {
    const firstDayOfMonth = dayjs().year(year).month(selectedMonth.value - 1).startOf('month');

    const lastDayOfMonth = dayjs().year(year).month(selectedMonth.value - 1).endOf('month');

    const startDayOfWeek = firstDayOfMonth.day();
    dayNames = [];
    daysOfMonth = [];
    calendar = [];

    for (let i = 0; i < 7; i++) {
        const dayName = firstDayOfMonth.day(i).format('dddd');
        dayNames.push(dayName);
    }

    for (let i = 1; i <= lastDayOfMonth.date(); i++) {
        daysOfMonth.push(firstDayOfMonth.date(i).format('MMM DD'));
    }

    const numRows = Math.ceil((startDayOfWeek + daysOfMonth.length) / 7);

    let dayIndex = 0;
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startDayOfWeek) {
                row.push('');
            } else if (dayIndex < daysOfMonth.length) {
                row.push(daysOfMonth[dayIndex]);
                dayIndex++;
            }
        }
        calendar.push(row);
    }

    return {
        dayNames,
        calendar,
    };
};

const updateCalendar = () => {
    const { dayNames, calendar } = generateCalendar(selectedYear.value, selectedMonth.value);
};

const generateMonths = () => {
    for (let i = 0; i < 12; i++) {
        const month = dayjs().startOf('year').add(i, 'month');
        months.value.push({ month: month.format('MMM'), day: month.format('M') });
    }
};
generateMonths();

updateCalendar();

const tasksByDay = computed(() => {
    const groupedTasks = {};
    tasks.todoTasks.forEach(task => {
        const taskDay = dayjs(task.due_date).date();
        groupedTasks[taskDay] = groupedTasks[taskDay] || [];
        groupedTasks[taskDay].push(task);
    });
    return groupedTasks;
});

watchEffect(() => {
    updateCalendar();
});
</script>

<template>
    <main class="w-full h-screen flex flex-row gap-0 flex-nowrap relative overflow-hidden">
        <!-- Sidebar container -->
        <ClientOnly>
            <sidebarVue />
        </ClientOnly>

        <!-- Main content section  -->
        <div class="w-full h-screen flex flex-col gap-0 relative overflow-auto overflow-x-hidden">
            <!-- Top header section -->
            <topHeader />

            <!-- parts secondary navbar -->
            <secondaryNavigationVue />

            <!-- Create project popup -->
            <createProject />

            <!-- Create new task popup -->
            <createTask />

            <createOrganization />

            <editProject />

            <deleteProject />

            <inviteMembers />

            <div class="w-full select-none px-8 py-2 relative z-0">
                <select v-model="selectedMonth"
                    class="bg-transparent rounded text-blue-400 border-none ring-0 ring-transparent outline-none focus:outline-none focus:ring-transparent">
                    <option v-for="month in months" :key="month.month" :value="month.day">{{ month.month }}</option>
                </select>
                <select v-model="selectedYear"
                    class="bg-transparent rounded text-blue-400 border-none ring-0 ring-transparent outline-none focus:outline-none focus:ring-transparent">
                    <option :value="dayjs().year() + 1">{{ dayjs().year() + 1 }}</option>
                    <option :value="dayjs().year()">{{ dayjs().year() }}</option>
                    <option :value="dayjs().year() - 1">{{ dayjs().year() - 1 }}</option>
                    <option :value="dayjs().year() - 2">{{ dayjs().year() - 2 }}</option>
                </select>
                <!-- Weekdays name -->
                <div class="w-full grid grid-cols-7 gap-0 sticky top-[217px] bg-mystic-midnight z-10">
                    <div v-for="day in dayNames" :key="day" class="w-full p-2">
                        <strong class="text-gray-300 px-2">
                            {{ day }}
                        </strong>
                        <span class="w-full block h-[1px] bg-tranquility rounded-full">&nbsp;</span>
                    </div>
                </div>

                <div class="w-full mx-auto mt-8 text-white z-0">

                    <div v-for="week in calendar" :key="week" class="w-full grid grid-cols-7 gap-2 my-6 text-white">

                        <div v-for="day in week" :key="day" class="w-full flex flex-col gap-2 justify-start items-start">
                            <strong v-if="day" class="text-gray-300 px-2">
                                {{ day }}
                            </strong>

                            <div v-if="day" class="w-full relative border rounded border-gray-800 p-1 flex flex-col justify-start items-start">
                                <div v-for="(task, i) in tasks.todoTasks" :key="i">
                                    <label
                                        v-if="dayjs(task.due_date).format('M') == selectedMonth && dayjs(task.due_date).format('MMM DD') == day && dayjs(task.due_date).format('YYYY') == selectedYear"
                                        class="rounded-full p-3 w-full h-auto shrink-0 flex flex-row items-center justify-start gap-2 cursor-pointer">
                                        <input type="checkbox" class="invisible opacity-0 hidden peer" :id="`task-${day}`">
                                        <Icon name="heroicons:check-circle-20-solid"
                                            class="text-xl shrink-0 text-deep-ocean-blue animate-tickPopup transition duration-150 peer-checked:text-tranquility" />
                                        <span class="text-gray-300 text-sm">
                                            {{ task.title }}
                                        </span>
                                    </label>
                                    
                                    <div class="w-full p-3 relative"
                                        v-if="dayjs(task.due_date).format('M') == selectedMonth && dayjs(task.due_date).format('MMM DD') == day && dayjs(task.due_date).format('YYYY') == selectedYear">
                                        <a-avatar-group :max-count="2"
                                            :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf' }"
                                            maxPopoverTrigger="null">
                                            <a-avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
                                                :gap="1" />
                                            <a-avatar style="background-color: #0F9690" :gap="1">K</a-avatar>
                                            <a-tooltip title="Ant User" placement="top">
                                                <a-avatar style="background-color: #87d068" :gap="1">
                                                    <template #icon>
                                                        <UserOutlined />
                                                    </template>
                                                </a-avatar>
                                            </a-tooltip>
                                            <a-avatar :gap="1" style="background-color: #0F9690">
                                                <template #icon>
                                                    <AntDesignOutlined />
                                                </template>
                                            </a-avatar>
                                        </a-avatar-group>
                                    </div>
                                </div>
                            </div>

                            <div v-if="!day"
                                class="w-full h-full rounded border border-gray-800 bg-deep-ocean-blue opacity-10">&nbsp;
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </main>
</template>
<style lang="postcss" scoped>
select {
    @apply text-tranquility;
}

select option {
    @apply bg-light-ocean-blue text-tranquility border-none outline-none
}
</style>