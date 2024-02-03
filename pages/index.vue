<script setup>
import useUsers from '~/composables/users';
import guestNavbar from '~/partials/guest-navbar.vue';
import { useProfilesStore } from '~/server/store/profiles';

useHead({
    title: 'Agile - Dashboard',
    meta: {
        name: 'Agile App',
        content: 'Agile App dashboard',
        key: 'Dashboard',
    }
})

definePageMeta({
    middleware: [
        'csrf',
        'guest',
    ],
});

const { sginIn } = useUsers();
const profiles = useProfilesStore();

const loginForm = ref({
    email: '',
    password: '',
});
</script>

<template>
    <main class="w-full h-screen bg-slate-100 relative overflow-auto" v-if="!profiles.auth">
        <NuxtLoadingIndicator />
        <section class="w-full h-full relative">
            <guestNavbar />
            <div class="w-full h-full absolute top-0 left-0 bg-hero bg-no-repeat bg-cover bg-center bg-fixed z-0">
                <div class="w-full h-full bg-slate-900 bg-opacity-75 relative flex justify-start items-center">
                    <div class="mx-auto xl:-translate-x-72 translate-x-0  mt-24 flex flex-col gap-4 select-none">
                        <h2 class="text-5xl text-gray-200 font-bold tracking-wide capitalize">
                            Revolutionize your <span class="uppercase text-tranquility">CRM</span>
                        </h2>
                        <p class="text-2xl font-normal text-gray-200">
                            Take your team management to the next level
                        </p>
                        <NuxtLink to="/login"
                            class="bg-gray-200 relative rounded text-slate-900 text-lg px-4 py-3 w-fit overflow-hidden transition duration-500 group hover:text-white">
                            <span class="relative z-10">Get Started</span>
                            <span
                                class="w-full h-full rounded absolute top-0 left-0 z-0 translate-y-16 bg-tranquility transition duration-500 group-hover:translate-y-0">&nbsp;</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-full;
}
</style>