<script setup>
import { ref } from 'vue';
import useOrganizations from '~/composables/organizations';
import { useProfilesStore } from "~/server/store/profiles";
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
        'valid-org-invitation',
    ],
});

const route = useRoute();
const email = route.params.email
const signature = route.params.signature
const profiles = useProfilesStore();

const signupForm = ref({
    firstname: '',
    lastname: '',
    password: '',
    password_confirmation: '',
});

const { acceptInvitation } = useOrganizations();
</script>

<template>
    <div class="w-full relative py-12 px-4" v-if="!profiles.auth">
        <NuxtLoadingIndicator />
        <div class="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <h2 class="text-lg text-gray-300 font-semibold tracking-wide">
                Create Your Account
            </h2>
            <form action="POST" class="w-full flex flex-col gap-2"
                @submit.prevent="acceptInvitation(signupForm, email, signature)">
                <div class="w-full flex flex-row gap-4 flex-wrap">
                    <div class="w-full min-w-[150px] flex flex-col gap-1 flex-1">
                        <label for="firstname" class="w-full text-base font-medium text-gray-300">
                            First Name
                        </label>
                        <input type="text" placeholder="First Name" id="firstname" v-model="signupForm.firstname"
                            class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                    </div>
                    <div class="w-full min-w-[150px] flex flex-col gap-1 flex-1">
                        <label for="surname" class="w-full text-base font-medium text-gray-300">
                            Surname
                        </label>
                        <input type="text" placeholder="Surname" id="surname" v-model="signupForm.lastname"
                            class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                    </div>
                </div>
                <div class="w-full flex flex-col gap-1">
                    <label for="email" class="w-full text-base font-medium text-gray-300">
                        Email Address
                    </label>
                    <input type="email" placeholder="Email Address" id="email" readonly disabled :value="email"
                        class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                </div>
                <div class="w-full flex flex-row gap-4 flex-wrap">
                    <div class="w-full min-w[150px] flex flex-col gap-1 flex-1">
                        <label for="password" class="w-full text-base font-medium text-gray-300">
                            Password
                        </label>
                        <input type="password" placeholder="Password" id="password" v-model="signupForm.password"
                            autocomplete="false"
                            class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                    </div>
                    <div class="w-full min-w[150px] flex flex-col gap-1 flex-1">
                        <label for="password_confirmation" class="w-full text-base font-medium text-gray-300">
                            Password Confirmation
                        </label>
                        <input type="password" placeholder="Password Confrimation" id="password_confirmation"
                            v-model="signupForm.password_confirmation" autocomplete="flase"
                            class="w-full min-h-[38px] rounded text-base tracking-wider font-bold text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
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