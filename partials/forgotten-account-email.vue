<script setup>
import useUsers from "~/composables/users";
import { usePopupsStore } from "~/server/store/popups";
import { useProfilesStore } from "~/server/store/profiles";


const popups = usePopupsStore();
const profiles = useProfilesStore();
const { requestResetPassword } = useUsers();
const emailAddress = ref(profiles.profile.user ? profiles.profile.user.email : '');

const sendPasswordResetLink = (input) => {
    requestResetPassword(input).finally(() => {
        if (profiles.outputCode === 200) {
            emailAddress.value = '';
        }
    });
}

const closePopup = () => {
    popups.toggleForgottenAccountEmail(false);
    profiles.getMessage('');
    profiles.setOutputCode(0);
}
</script>

<template>
    <div
        class="w-full h-full top-0 left-0 z-40 fixed flex justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur-sm">
        <div
            :class="`w-full animate-popupFade max-w-md shadow-lg rounded ${profiles.profile.user ? 'bg-deep-teal border border-slate-600' : 'bg-slate-200 border border-slate-300'}`">
            <div
                :class="`w-full ${profiles.profile.user ? 'border-b border-slate-600' : 'border-b border-slate-300'} flex justify-between items-center p-4`">
                <h3 :class="`text-md font-bold ${profiles.profile.user ? 'text-slate-300' : 'text-slate-900'}`">
                    Restore your account
                </h3>
                <a-button type="ghost" htmlType="ghost" @click="closePopup()"
                    :class="`${profiles.profile.user ? 'bg-deep-teal' : 'bg-slate-200'} w-6 h-6 p-0 m-0 flex justify-center items-center`">
                    <Icon name="heroicons:x-mark"
                        :class="`w-5 h-5 shrink-0 ${profiles.profile.user ? 'text-slate-300' : 'text-slate-900'}`" />
                </a-button>
            </div>

            <!-- body -->
            <form class="w-full flex flex-col gap-4 p-4" @submit.prevent="sendPasswordResetLink(emailAddress)">
                <!-- text -->
                <p :class="`${profiles.profile.user ? 'text-gray-200' : 'text-slate-900'} font-medium`">
                    Please enter your email addres to receive instructions.
                </p>
                <!-- input -->
                <div class="w-full relative mt-2">
                    <input type="email" id="email" autocomplete="false" v-model="emailAddress"
                        :disabled="profiles.loadingProfile || profiles.profile.user"
                        :class="`min-h-[38px] block px-2 w-full text-base font-medium tracking-wide ${profiles.profile.user ? 'text-gray-200 bg-emerald-splash border border-gray-600' : 'text-mystic-midnight bg-slate-100 border border-gray-400 focus:bg-slate-50 border-1 border-gray-400'} rounded appearance-none ring-8 ring-transparent transition duration-200 focus:ring-2 focus:ring-tranquility focus:outline-none disabled:opacity-50 peer`"
                        placeholder=" " />
                    <label for="email"
                        :class="`absolute select-none cursor-text text-base ${profiles.profile.user ? 'text-gray-300 peer-focus:text-gray-300' : 'text-mystic-midnight peer-focus:text-mystic-midnight'} duration-200 transform -translate-y-8 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-transparent rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`">
                        Email Address
                    </label>
                </div>
                <!-- button -->
                <div class="w-full flex justify-end items-center">
                    <a-button type="ghost" htmlType="submit" :disabled="profiles.loadingProfile"
                        class="w-fit select-none inline-flex justify-center items-center px-4 py-5 text-base font-medium text-slate-100 rounded bg-tranquility shadow-md disabled:opacity-50">
                        Send Link
                    </a-button>
                </div>
            </form>

            <div
                :class="`w-full px-4 pb-4 text-base font-medium ${profiles.outputCode === 200 ? 'text-green-600' : 'text-red-600'}`">
                <ul v-if="Array.isArray(profiles.messages)">
                    <li v-for="message in profiles.messages" :key="message">
                        &cross;&nbsp;{{ message }}
                    </li>
                </ul>
                <p v-else>
                    {{ profiles.messages }}
                </p>
            </div>
        </div>
    </div>
</template>