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
    <main class="w-full relative" v-if="!profiles.auth">
        <NuxtLoadingIndicator />
        <guestNavbar />

        <!-- Login form -->
        <div class="w-full relative py-12 px-4">
            <form action="POST" class="w-full max-w-sm flex flex-col gap-4 mx-auto" @submit.prevent="sginIn(loginForm)">
                <input type="email" placeholder="Email Address" v-model="loginForm.email"
                    class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                <input type="password" placeholder="Password" v-model="loginForm.password" autocomplete="false"
                    class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                <a-button type="ghost" htmlType="submit"
                    class="w-full rounded py-5 px-8 text-md text-mystic-midnight font-semibold tracking-wide bg-emerald-splash flex justify-center items-center">
                    Login
                </a-button>
            </form>
            <div class="w-full max-w-sm relative mx-auto py-4 px-2 text-red-500" v-if="profiles.messages && profiles.messages.length > 0">
                <ul v-if="Array.isArray(profiles.messages)">
                    <li v-for="message in profiles.messages" :key="message">
                        &cross;&nbsp;{{ message }}
                    </li>
                </ul>
                <p v-else>
                    &cross;&nbsp;{{ profiles.messages }}
                </p>
            </div>
        </div>
    </main>
</template>

<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>