<script setup>
import { ref } from 'vue';
import { useProfilesStore } from "~/server/store/profiles";
import useUsers from '~/composables/users';
useHead({
    title: 'Agile - Organization Invitation',
    meta: {
        name: 'Agile App',
        content: 'Organization Invitation',
        key: 'Organization-invitation',
    }
})
definePageMeta({
    middleware: [
        'csrf',
        'validate-invitation',
    ],
});

const route = useRoute();
const email = route.params.email
const profiles = useProfilesStore();
const { signUp } = useUsers();

const signupForm = ref({
    firstname: '',
    lastname: '',
    email: route.params.email,
    password: '',
    password_confirmation: '',
    token: route.params.signature
});

</script>

<template>
    <div class="w-full relative py-12 px-4" v-if="!profiles.auth">
        <NuxtLoadingIndicator />
        <div class="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <h2 class="text-lg text-gray-300 font-semibold tracking-wide">
                Create Your Account
            </h2>
            <form action="POST" class="w-full flex flex-col gap-2" @submit.prevent="signUp(signupForm)">
                <div class="w-full flex flex-row gap-4 flex-wrap">
                    <div class="w-full relative flex-1 min-w-[160px]">
                        <input type="text" id="fristname" v-model="signupForm.firstname" autocomplete="false"
                            class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-gray-300 bg-deep-ocean-blue rounded border-1 border-gray-700 appearance-none transition duration-200 ring-8 ring-transparent focus:bg-deep-ocean-blue focus:ring-2 focus:ring-tranquility focus:outline-none peer"
                            placeholder=" " />
                        <label for="fristname"
                            class="absolute cursor-text text-base text-gray-300 text-opacity-75 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-deep-ocean-blue px-2 peer-focus:px-2 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                            First Name
                        </label>
                    </div>
                    <div class="w-full relative flex-1 min-w-[160px]">
                        <input type="text" id="surname" v-model="signupForm.lastname" autocomplete="false"
                            class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-gray-300 bg-deep-ocean-blue rounded border-1 border-gray-700 appearance-none transition duration-200 ring-8 ring-transparent focus:bg-deep-ocean-blue focus:ring-2 focus:ring-tranquility focus:outline-none peer"
                            placeholder=" " />
                        <label for="surname"
                            class="absolute cursor-text text-base text-gray-300 text-opacity-75 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-deep-ocean-blue px-2 peer-focus:px-2 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                            Last Name
                        </label>
                    </div>
                </div>
                <div class="w-full flex flex-col gap-1 mb-5">
                    <label for="email" class="w-full text-base font-medium text-gray-300 scale-75 -translate-x-[4.5rem]">
                        Email Address
                    </label>
                    <input type="email" placeholder="Email Address" id="email" readonly disabled :value="email"
                        class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                </div>
                <div class="w-full flex flex-row gap-4 flex-wrap">
                    <div class="w-full relative flex-1 min-w-[160px]">
                        <input type="text" id="password" v-model="signupForm.password" autocomplete="false"
                            class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-gray-300 bg-deep-ocean-blue rounded border-1 border-gray-700 appearance-none transition duration-200 ring-8 ring-transparent focus:bg-deep-ocean-blue focus:ring-2 focus:ring-tranquility focus:outline-none peer"
                            placeholder=" " />
                        <label for="password"
                            class="absolute cursor-text text-base text-gray-300 text-opacity-75 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-deep-ocean-blue px-2 peer-focus:px-2 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                            Password
                        </label>
                    </div>
                    <div class="w-full relative flex-1 min-w-[160px]">
                        <input type="text" id="password_confirmation" v-model="signupForm.password_confirmation"
                            autocomplete="false"
                            class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-gray-300 bg-deep-ocean-blue rounded border-1 border-gray-700 appearance-none transition duration-200 ring-8 ring-transparent focus:bg-deep-ocean-blue focus:ring-2 focus:ring-tranquility focus:outline-none peer"
                            placeholder=" " />
                        <label for="password_confirmation"
                            class="absolute cursor-text text-base text-gray-300 text-opacity-75 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-deep-ocean-blue px-2 peer-focus:px-2 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                            Confirm Password
                        </label>
                    </div>
                </div>
                <div class="w-full flex flex-col items-start py-2">
                    <a-button type="ghost" htmlType
                        class="w-fit px-4 py-5 rounded bg-tranquility mr-0 flex items-center justify-center text-base font-semibold tracking-wide">
                        Create Account
                    </a-button>
                </div>
            </form>
        </div>
    </div>
</template>
<style lang="postcss">
html,
body {
    @apply bg-mystic-midnight h-screen overflow-hidden;
}
</style>