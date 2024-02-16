<script setup>
import useUsers from '~/composables/users';
import guestNavbar from '~/partials/guest-navbar.vue';
import { usePopupsStore } from '~/server/store/popups';
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
        'verify-password-reset',
    ],
});

const popups = usePopupsStore();
const profiles = useProfilesStore();
const resetPasswordForm = ref({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
});
const { passwordReset } = useUsers();

const resetPassword = (inputs) => {
    passwordReset(inputs).finally(() => {
        if (profiles.outputCode === 200) {
            return navigateTo('/login')
        }
    });
}

onMounted(() => {
})
</script>

<template>
    <main class="w-full h-screen bg-slate-100 relative overflow-auto">
        <NuxtLoadingIndicator />
        <guestNavbar />
        <form class="w-full max-w-lg mx-auto flex flex-col gap-4 p-4 mt-8"
            @submit.prevent="resetPassword(resetPasswordForm)">
            <!-- text -->
            <p :class="`${profiles.profile.user ? 'text-gray-200' : 'text-slate-900'} font-medium`">
                To change your password enter your current password.
            </p>
            <!-- current password -->
            <div class="w-full relative mt-2">
                <input type="password" id="current_password" autocomplete="false"
                    v-model="resetPasswordForm.current_password" :disabled="profiles.loadingProfile"
                    :class="`min-h-[38px] block px-2 w-full text-base font-medium tracking-wide ${profiles.profile.user ? 'text-gray-200 bg-emerald-splash border border-gray-600' : 'text-mystic-midnight bg-slate-100 border border-gray-400 focus:bg-slate-50 border-1 border-gray-400'} rounded appearance-none ring-8 ring-transparent transition duration-200 focus:ring-2 focus:ring-tranquility focus:outline-none disabled:opacity-50 peer`"
                    placeholder="" />
                <label for="current_password"
                    :class="`absolute select-none cursor-text text-base ${profiles.profile.user ? 'text-gray-300 peer-focus:text-gray-300' : 'text-mystic-midnight peer-focus:text-mystic-midnight'} duration-200 transform -translate-y-8 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-transparent rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`">
                    Current Password
                </label>
            </div>
            <!-- new password -->
            <div class="w-full relative mt-2">
                <input type="password" id="new_password" autocomplete="false" v-model="resetPasswordForm.new_password"
                    :disabled="profiles.loadingProfile"
                    :class="`min-h-[38px] block px-2 w-full text-base font-medium tracking-wide ${profiles.profile.user ? 'text-gray-200 bg-emerald-splash border border-gray-600' : 'text-mystic-midnight bg-slate-100 border border-gray-400 focus:bg-slate-50 border-1 border-gray-400'} rounded appearance-none ring-8 ring-transparent transition duration-200 focus:ring-2 focus:ring-tranquility focus:outline-none disabled:opacity-50 peer`"
                    placeholder="" />
                <label for="new_password"
                    :class="`absolute select-none cursor-text text-base ${profiles.profile.user ? 'text-gray-300 peer-focus:text-gray-300' : 'text-mystic-midnight peer-focus:text-mystic-midnight'} duration-200 transform -translate-y-8 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-transparent rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`">
                    New Password
                </label>
            </div>
            <!-- confirm password -->
            <div class="w-full relative mt-2">
                <input type="password" id="new_password_confirmation" autocomplete="false"
                    v-model="resetPasswordForm.new_password_confirmation" :disabled="profiles.loadingProfile"
                    :class="`min-h-[38px] block px-2 w-full text-base font-medium tracking-wide ${profiles.profile.user ? 'text-gray-200 bg-emerald-splash border border-gray-600' : 'text-mystic-midnight bg-slate-100 border border-gray-400 focus:bg-slate-50 border-1 border-gray-400'} rounded appearance-none ring-8 ring-transparent transition duration-200 focus:ring-2 focus:ring-tranquility focus:outline-none disabled:opacity-50 peer`"
                    placeholder="" />
                <label for="new_password_confirmation"
                    :class="`absolute select-none cursor-text text-base ${profiles.profile.user ? 'text-gray-300 peer-focus:text-gray-300' : 'text-mystic-midnight peer-focus:text-mystic-midnight'} duration-200 transform -translate-y-8 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-transparent rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`">
                    Confirm Password
                </label>
            </div>
            <!-- Restore account -->
            <a-button type="ghost" htmlType="button" @click="forgottenAccountPopup()"
                class="w-fit select-none inline-flex justify-center items-center px-2 text-base font-medium text-serene-skyline rounded bg-transparent disabled:opacity-50">
                Forgotten Account
            </a-button>
            <!-- button -->
            <div class="w-full flex justify-end items-center">
                <a-button type="ghost" htmlType="submit" :disabled="profiles.loadingProfile"
                    class="w-fit select-none inline-flex justify-center items-center px-4 py-5 text-base font-medium text-slate-100 rounded bg-tranquility shadow-md disabled:opacity-50">
                    Reset Password
                </a-button>
            </div>

            <div
                :class="`w-full text-base font-medium ${profiles.outputCode === 200 ? 'text-green-500' : 'text-red-500'}`">
                <ul v-if="Array.isArray(profiles.messages)">
                    <li v-for="message in profiles.messages" :key="message">
                        &cross;&nbsp;{{ message }}
                    </li>
                </ul>
                <p v-else>
                    {{ profiles.messages }}
                </p>
            </div>
        </form>
    </main>
</template>

<style lang="postcss">
html,
body {
    @apply h-full;
}
</style>