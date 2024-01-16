<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

</script>

<template>
    <div
        class="w-full bg-mystic-midnight select-none sticky top-0 left-0 p-2 flex justify-between items-center z-20">
        <!-- Logo and toggle button -->
        <div
            class="w-w-fit h-fit text-white bg-mystic-midnight p-2 flex flex-row justify-between items-center grow relative">
            <NuxtLink to="/">
                <NuxtImg src="agile-crm.png" class="w-10 h-10" />
            </NuxtLink>
        </div>
        <!-- Menu items -->
        <div class="w-full flex justify-end items-center">
            <ul>
                <li class="inline-block">
                    <NuxtLink to="/" class="inline-block text-base font-medium tracking-wide px-5 py-2 text-gray-300 relative group">
                        <p class="block w-fit relative">
                            Home
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-tranquility bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li><li class="inline-block">
                    <NuxtLink to="/" class="inline-block text-base font-medium tracking-wide px-5 py-2 text-gray-300 relative group">
                        <p class="block w-fit relative">
                            Login
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-tranquility bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>