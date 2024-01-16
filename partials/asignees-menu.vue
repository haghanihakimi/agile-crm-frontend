<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';

const asigneeRef = ref(null);
const asigneeVis = ref(false);
const popups = usePopupsStore();

onClickOutside(asigneeRef,
    () => {
        asigneeVis.value = false
    })
</script>

<template>
    <div class="w-full relative cursor-pointer z-10" ref="asigneeRef">
        <a-button type="button" @click="asigneeVis = true"
            class="block w-full min-h-[42px] flex justify-center items-center text-base font-medium text-gray-300 bg-deep-ocean-blue rounded border border-gray-700">
            Frank
        </a-button>
        <div v-if="asigneeVis"
            class="w-full min-w-[280px] animate-profileMenuFade absolute rounded bg-deep-teal left-0 right-0 mx-auto mt-3 border border-gray-800 shadow-md">
            <span
                class="w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-deep-teal border-r-[10px] border-r-transparent absolute -top-[10px] left-2 mx-auto">
                &nbsp;
            </span>
            <!-- Search box container -->
            <div class="w-full min-w-[280px] relative p-2 flex flex-col gap-2">
                <div class="w-full relative">
                    <input type="text" placeholder="Search names or roles..."
                        class="w-full no-arrow pr-8 rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                    <Icon name="heroicons:magnifying-glass" class="text-xl absolute top-0 right-2 bottom-0 my-auto" />
                </div>
                <a-button type="button" @click="popups.toggleMemberInvitation(true); asigneeVis = false"
                    class="w-full bg-transparent text-base text-gray-300 rounded active:bg-deep-teal font-medium border-none outline-none hover:bg-deep-teal hover:text-tranquility">
                    Invite a new member by email
                </a-button>

                <div class="w-full relative">
                    <ul class="w-full">
                        <li
                            class="p-2 rounded flex flex-row gap-2 justify-start items-center border-b border-gray-700 last:border-none transition duration-150 hover:bg-deep-ocean-blue">
                            <a-avatar :size="40">D</a-avatar>
                            <span class="text-base font-medium">
                                Daniel HK
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>