<script setup>
import { ref } from 'vue';
import { useRafFn } from '@vueuse/core'
import createOrganization from '~/partials/create-organization.vue';
import createProject from '~/partials/create-project.vue';
import inviteMembers from '~/partials/invite-members.vue';
import editProject from '~/partials/edit-project.vue';
import deleteProject from '~/partials/delete-project.vue';
import sidebarVue from "~/partials/sidebar.vue";
import topHeader from "~/partials/top-header.vue";
import editProfile from '~/partials/edit-profile.vue';
import deleteProfile from '~/partials/delete-profile.vue';
import { useProfilesStore } from '~/server/store/profiles';
import { usePopupsStore } from '~/server/store/popups';
import useUsers from '~/composables/users';

const profiles = useProfilesStore();
const popups = usePopupsStore();
const dayjs = useDayjs();
const { updateProfileImage } = useUsers();
const currentTime = ref(dayjs().format('hh:mma'));
const profileImage = ref([]);

const handleFileChange = async (event) => {
    const input = event.target;
    profileImage.value = input.files;

    if (input.files && input.files.length > 0) {
        const blob = new Blob([profileImage.value[0]], { type: profileImage.value[0].type });
        const blobUrl = URL.createObjectURL(blob);
        const imgElement = document.getElementById('current_profile_image');
        imgElement.src = blobUrl;
        imgElement.srcset = blobUrl;
    }
};

const cancelImageUpload = () => {
    profileImage.value = [];
    const imgElement = document.getElementById('current_profile_image');
    imgElement.src = profiles.profile.user.image;
    imgElement.srcset = profiles.profile.user.image;
}

const saveProfileImage = () => {
    updateProfileImage(profileImage.value).finally(() => {
        if (profiles.outputCode === 200) {
            profileImage.value = []
        }
    });
}

useRafFn(() => {
    currentTime.value = dayjs().format('hh:mma')
})

</script>

<template>
    <main id="profile-settings" class="w-full h-screen flex flex-row gap-0 flex-nowrap relative overflow-hidden">
        <!-- Sidebar container -->
        <ClientOnly>
            <sidebarVue />
        </ClientOnly>

        <!-- Main content section  -->
        <div class="w-full h-screen flex flex-col gap-0 relative overflow-auto overflow-x-hidden">
            <!-- Top header section -->
            <topHeader />

            <createOrganization />

            <createProject />

            <editProject />

            <deleteProject />

            <inviteMembers />

            <editProfile v-if="popups.editProfilePopup" />

            <deleteProfile v-if="popups.deleteAccountPopup" />

            <div class="w-full max-w-5xl mx-auto relative px-6 pt-12 pb-6 flex flex-col gap-6">
                <!-- profile image and name -->
                <div class="w-full flex flex-row items-center justify-start">
                    <!-- profile image -->
                    <form method="PATCH" @submit.prevent="saveProfileImage()" class="w-fit h-fit relative">
                        <div class="w-32 h-32 rounded-full shadow-md relative group shrink-0">
                            <NuxtImg :src="profiles.profile.user.image" class="w-32 h-32 rounded-full object-cover"
                                id="current_profile_image" />
                            <label for="profile_image"
                                class="bg-black bg-opacity-75 absolute w-full h-full top-0 left-0 z-10 rounded-full flex justify-center items-center opacity-0 transition duration-200 cursor-pointer group-hover:opacity-100">
                                <input type="file" @change="handleFileChange" id="profile_image"
                                    class="opacity-0 hidden invisible" accept="image/jpg, image/jpeg, image/png" />
                                <Icon name="material-symbols:add-a-photo-outline" class="text-2xl text-gray-300" />
                            </label>
                        </div>
                        <div class="w-full relative flex flex-row" v-if="profileImage.length > 0">
                            <a-button class="w-fit bg-mystic-midnight text-white text-sm border-none"
                                @click="cancelImageUpload()">
                                Cancel
                            </a-button>
                            <a-button type="ghost" htmlType="submit"
                                class="w-fit bg-mystic-midnight text-white text-sm border-none">
                                Save
                            </a-button>
                        </div>
                    </form>

                    <!-- profile name -->
                    <div class="w-full flex flex-col relative p-6">
                        <strong class="text-xl font-medium text-gray-300">
                            {{ `${profiles.profile.user.firstname} ${profiles.profile.user.lastname}` }}
                        </strong>
                        <p class="text-gray-400 text-sm font-medium flex flex-row items-center justify-start">
                            <span>
                                <Icon name="material-symbols-light:nest-clock-farsight-analog-outline-rounded"
                                    class="text-xl text-gray-400" />
                                {{ currentTime }} local time
                            </span>
                        </p>
                    </div>
                </div>

                <!-- Personal information section -->
                <div class="w-full rounded border border-gray-800 shadow-md p-6 flex flex-col gap-8">
                    <div class="w-full flex flex-row items-center justify-between">
                        <h2 class="w-full text-base font-bold text-gray-300">
                            Personal Information
                        </h2>
                        <a-button type="ghost" htmlType="button" @click="popups.toggleEditProfilePopup(true)"
                            class="w-fit m-0 px-4 py-4 flex justify-between items-center gap-1 text-base font-medium bg-mystic-midnight text-gray-300 rounded border border-gray-800 shadow-sm">
                            Edit
                            <Icon name="material-symbols:ink-pen-outline" class="text-base text-gray-300" />
                        </a-button>
                    </div>

                    <div class="w-full flex flex-row justify-between items-start">
                        <!-- personal information s1 -->
                        <div class="w-full flex flex-col gap-6">
                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">First Name</span>
                                <span class="font-medium">{{ profiles.profile.user.firstname }}</span>
                            </label>
                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Email Address</span>
                                <span class="font-medium">{{ profiles.profile.user.email }}{{
                                    profiles.profile.user.email_verified_at
                                    ? '' : ` (unverified)` }}</span>
                            </label>
                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Bio</span>
                                <span class="font-medium">
                                    {{ profiles.profile.user.bio }}
                                </span>
                            </label>
                        </div>
                        <!-- personal information s2 -->
                        <div class="w-full flex flex-col gap-6">
                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Last Name</span>
                                <span class="font-medium">{{ profiles.profile.user.lastname }}</span>
                            </label>

                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Phone</span>
                                <span class="font-medium">
                                    {{ profiles.profile.user.phone }}
                                </span>
                            </label>

                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Organizations</span>
                                <span class="font-medium">
                                    {{ `Member of ${profiles.profile.orgs} ${profiles.profile.orgs > 10 ? 'organizations' :
                                        'organization'}` }}
                                </span>
                            </label>

                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Projects</span>
                                <span class="font-medium" v-if="profiles.profile.projects > 0">
                                    {{ `${profiles.profile.projects} ${profiles.profile.projects > 10
                                        ? ' projects assigned to you' : ' project assigned to you.'}` }}
                                </span>
                                <span class="font-medium" v-else>
                                    No project assigned to you.
                                </span>
                            </label>

                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Tasks</span>
                                <span class="font-medium" v-if="profiles.profile.tasks > 0">
                                    {{ `${profiles.profile.tasks} ${profiles.profile.tasks > 10 ? ' tasks assigned to you.'
                                        :
                                        ' task assigned to you.'
                                        } ` }}
                                </span>
                                <span class="font-medium" v-else>
                                    No task assigned to you.
                                </span>
                            </label>

                            <label class="text-base font-semibold flex flex-col gap-2 text-gray-300">
                                <span class="text-gray-400">Security</span>
                                <a-button type="button"
                                    class="w-fit text-base text-tranquility bg-mystic-midnight p-0 font-medium">
                                    Change password
                                </a-button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>