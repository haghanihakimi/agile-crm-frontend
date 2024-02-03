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
        <div class="w-full max-w-sm mx-auto relative pt-12 pb-6 px-4 border border-slate-200 my-6 rounded shadow-sm">
            <form action="POST" class="w-full max-w-sm flex flex-col gap-6 mx-auto" @submit.prevent="sginIn(loginForm)">
                <h2 class="text-lg font-semibold text-mystic-midnight flex flex-col justify-center items-center">
                    Welcome back!
                    <span class="text-base font-normal text-slate-700">Log in to stay organized and productive</span>
                </h2>
                <div class="w-full relative mt-0">
                    <input type="email" id="email_address" v-model="loginForm.email"
                        autocomplete="true"
                        class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-mystic-midnight bg-slate-100 rounded border-1 border-gray-400 appearance-none ring-8 ring-transparent transition duration-200 focus:bg-slate-50 focus:ring-2 focus:ring-tranquility focus:outline-none peer"
                        placeholder=" " />
                    <label for="email_address"
                        class="absolute cursor-text text-base text-mystic-midnight text-opacity-75 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-mystic-midnight peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Email Address
                    </label>
                </div>
                <div class="w-full relative mt-0">
                    <input type="password" id="password" v-model="loginForm.password"
                        autocomplete="false"
                        class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-mystic-midnight bg-slate-100 rounded border-1 border-gray-400 appearance-none ring-8 ring-transparent transition duration-200 focus:bg-slate-50 focus:ring-2 focus:ring-tranquility focus:outline-none peer"
                        placeholder=" " />
                    <label for="password"
                        class="absolute cursor-text text-base text-mystic-midnight text-opacity-75 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-mystic-midnight peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Password
                    </label>
                </div>
                <a-button type="ghost" htmlType="submit"
                    class="w-full rounded py-5 px-8 text-lg text-slate-50 font-semibold tracking-wide bg-tranquility flex justify-center items-center shadow-sm hover:bg-emerald-splash">
                    Login
                </a-button>

                <div class="w-full max-w-sm relative mx-auto px-2 pt-2 text-red-500"
                    v-if="profiles.messages && profiles.messages.length > 0">
                    <ul v-if="Array.isArray(profiles.messages)">
                        <li v-for="message in profiles.messages" :key="message">
                            &cross;&nbsp;{{ message }}
                        </li>
                    </ul>
                    <p v-else>
                        &cross;&nbsp;{{ profiles.messages }}
                    </p>
                </div>

                <!-- <div class="w-full relative">
                    <span
                        class="block bg-slate-100 w-fit min-w-[70px] rounded border border-slate-200 mx-auto text-center text-slate-600 z-10 before:w-full before:absolute before:bg-slate-200 before:rounded-full before:h-[2px] before:left-0 before:top-0 before:bottom-0 before:my-auto before:z-0">
                        <span class="relative z-50 bg-slate-100 px-2 py-1 inline-block w-full rounded-full">
                            Or Continue With
                        </span>
                    </span>
                </div>

                <div class="w-full flex flex-row gap-2 justify-center items-center select-none">
                    <NuxtLink to="/"
                        class="w-fit flex flex-row gap-2 items-center text-slate-900 px-2 py-1 rounded bg-slate-200 border border-slate-300">
                        <Icon name="mdi:github" class="w-6 h-6" />
                        <span class="text-base slate-90 font-medium tracking-wide">GitHub</span>
                    </NuxtLink>
                    <NuxtLink to="/"
                        class="w-fit flex flex-row gap-2 items-center px-2 py-1 text-slate-900 rounded bg-slate-200 border border-slate-300">
                        <Icon name="uil:google" class="w-6 h-6" />
                        <span class="text-base slate-90 font-medium tracking-wide">Google</span>
                    </NuxtLink>
                </div> -->
            </form>
        </div>
    </main>
</template>

<style lang="postcss">
html,
body {
    @apply bg-slate-100 h-screen overflow-hidden;
}
</style>