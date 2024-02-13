<script setup>
import { ref, reactive } from 'vue';
import useUsers from '~/composables/users';
import { usePopupsStore } from '~/server/store/popups';
import { useProfilesStore } from '~/server/store/profiles';

const popups = usePopupsStore();
const profiles = useProfilesStore();
const initialProfile = ref(null);
const { saveProfile } = useUsers();

const saveSettings = () => {
    saveProfile().finally(() => {
        if (profiles.outputCode == 200) {
            initialProfile.value = { ...profiles.profile.user };
        }
    });
}

const closePopup = () => {
    if (profiles.outputCode !== 200) {
        profiles.saveSettings(initialProfile.value);
    }
    popups.toggleEditProfilePopup(false);
}

// Initialize initialProfile with the current profile data on component mount
onMounted(() => {
    initialProfile.value = { ...profiles.profile.user };
});

// Computed property to check if there are changes in the profile data
const hasChanges = computed(() => {
    if (!initialProfile.value) return false;

    return Object.keys(profiles.profile.user).some(
        key => profiles.profile.user[key] !== initialProfile.value[key]
    );
});

</script>

<template>
    <div
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-50 backdrop-blur-sm fixed top-0 left-0 z-50">
        <form method="POST" class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade"
            @submit.prevent="saveSettings()">
            <!-- popup title & control -->
            <div class="w-full flex flex-row justify-between items-center p-4">
                <h2 class="w-full relative text-md tracking-wide font-bold text-gray-300">
                    Update Profile
                </h2>
                <a-button type="ghost" htmlType="button" @click="closePopup(); profiles.getMessage('')"
                    class="w-8 h-8 shrink-0 m-0 p-0 rounded bg-light-ocean-blue rounded border-none ring-0 flex items-center justify-center">
                    <Icon name="heroicons:x-mark" class="text-lg text-gray-300" />
                </a-button>
            </div>

            <div class="w-full flex flex-col gap-4 p-4">
                <div class="w-full flex flex-row flex-wrap gap-4">
                    <div class="w-full flex flex-col gap-1 flex-1">
                        <label for="firstname" class="w-full text-base text-gray-300 font-medium select-none">
                            First Name
                        </label>
                        <input type="text" :placeholder="profiles.profile.user.firstname" id="firstname"
                            v-model="profiles.profile.user.firstname" :disabled="profiles.savingChanges"
                            class="w-full min-h-[px] rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                    </div>

                    <div class="w-full flex flex-col gap-1 flex-1">
                        <label for="lastname" class="w-full text-base text-gray-300 font-medium select-none">
                            Last Name
                        </label>
                        <input type="text" :placeholder="profiles.profile.user.lastname" id="lastname"
                            v-model="profiles.profile.user.lastname" :disabled="profiles.savingChanges"
                            class="w-full min-h-[px] rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                    </div>
                </div>

                <div class="w-full flex flex-col gap-1">
                    <label for="email" class="w-full text-base text-gray-300 font-medium select-none">
                        Email Address
                    </label>
                    <input type="email" :placeholder="profiles.profile.user.email" id="email"
                        v-model="profiles.profile.user.email" :disabled="profiles.savingChanges"
                        class="w-full min-h-[px] rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                </div>

                <div class="w-full flex flex-col gap-1">
                    <label for="phone" class="w-full text-base text-gray-300 font-medium select-none">
                        Phone Number
                    </label>
                    <input type="tel" :placeholder="profiles.profile.user.phone" id="phone"
                        v-model="profiles.profile.user.phone" :disabled="profiles.savingChanges"
                        class="w-full min-h-[px] rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50" />
                </div>

                <div class="w-full flex flex-col gap-1">
                    <label for="bio" class="w-full text-base text-gray-300 font-medium select-none">
                        Biography
                    </label>
                    <textarea :placeholder="profiles.profile.user.bio" id="bio" v-model="profiles.profile.user.bio"
                        :disabled="profiles.savingChanges"
                        class="w-full h-auto resize-none overflow-y-auto rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none disabled:opacity-50">
                        </textarea>
                </div>

                <div class="w-full relative text text-base text-gray-400 font-medium">
                    Member of
                    {{ `${profiles.profile.orgs} ${profiles.profile.orgs > 10 ? 'organizations' : 'organization'}` }},
                    {{ `${profiles.profile.projects} ${profiles.profile.projects > 10 ? 'projects' : 'project'}` }},
                    {{ `${profiles.profile.tasks} ${profiles.profile.tasks > 10 ? 'tasks' : 'task'}` }}.
                </div>

                <div class="w-full flex flex-row gap-4 justify-between items-center">
                    <a-button type="ghost" htmlType="button" :disabled="profiles.savingChanges"
                        @click="popups.toggleDeleteAccountPopup(true)"
                        class="w-fit h-auto flex justify-center items-center py-2 px-0 rounded bg-transparent text-red-500 text-base font-medium disabled:opacity-50">
                        Delete Account
                    </a-button>
                    <a-button v-if="hasChanges" type="ghost" htmlType="submit"
                        :disabled="!hasChanges || profiles.savingChanges"
                        class="w-fit h-auto animate-fadeIn flex justify-center items-center p-2 rounded bg-emerald-splash text-gray-300 text-base font-medium disabled:opacity-50">
                        Save Changes
                    </a-button>
                </div>

                <div v-if="profiles.messages" :class="`w-full text-base font-medium ${profiles.outputCode === 200 ? 'text-green-600' : 'text-red-500'}`">
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
        </form>
    </div>
</template>