<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

</script>

<template>
    <div
        class="w-full z-10 bg-slate-100 bg-opacity-90 backdrop-blur-lg select-none sticky top-0 left-0 p-6 flex justify-between items-center z-20 border-b border-slate-200 shadow-md">
        <!-- Logo and toggle button -->
        <div class="w-auto h-fit text-white px-6 flex flex-row justify-between items-center grow relative">
            <NuxtLink to="/" class="shrink-0">
                <NuxtImg src="agile-crm.png" class="w-10 h-10 shrink-0" />
            </NuxtLink>
            <NuxtLink to="/" class="p-4 text-base font-bold text-slate-900 shrink-0">
                Agile CRM
            </NuxtLink>
        </div>
        <!-- Menu items -->
        <div class="w-full flex justify-end items-center">
            <ul>
                <li class="inline-block">
                    <NuxtLink to="/"
                        class="inline-block text-base font-semibold tracking-wide px-5 py-2 text-slate-900 relative group">
                        <p class="block w-fit relative">
                            Home
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-slate-900 bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li>
                <li class="inline-block">
                    <NuxtLink to="/login"
                        class="inline-block text-base font-semibold tracking-wide px-5 py-2 text-slate-900 relative group">
                        <p class="block w-fit relative">
                            Login
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-slate-900 bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li>
                <li class="inline-block">
                    <NuxtLink to="/signup"
                        class="inline-block text-base font-semibold tracking-wide px-5 py-2 text-slate-900 relative group">
                        <p class="block w-fit relative">
                            Sign Up
                            <span
                                class="absolute w-full h-[2.3px] rounded-full bg-slate-900 bottom-0 left-0 transition duration-200 scale-x-0 group-hover:scale-x-100">&nbsp;</span>
                        </p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>