<script setup>
import { onClickOutside } from '@vueuse/core';
import { Vue3Lottie } from 'vue3-lottie';
import Loading from "~/assets/images/loading.json";
import useUsers from '~/composables/users';
import { usePopupsStore } from '~/server/store/popups';
import { useProfilesStore } from '~/server/store/profiles';

const profileCardRef = ref(null);
const { fetchUsers } = useUsers();
const popups = usePopupsStore();
const profiles = useProfilesStore();

onClickOutside(profileCardRef,
    () => {
        popups.toggleUserProfile(0, false);
    })

onMounted(() => {
    fetchUsers(popups.userProfilePopup.id).finally(() => {
        if (profiles.users.length > 0) {
            profiles.getUser(popups.userProfilePopup.id);
        }
    });
})
</script>

<template>
    <div
        class="w-full h-full flex justify-center items-center bg-mystic-midnight bg-opacity-10 backdrop-blur-sm fixed top-0 left-0 z-50">
        <div class="w-full max-w-2xl animate-popupFade rounded shadow-lg bg-deep-ocean-blue border border-gray-700"
            ref="profileCardRef">
            <div v-if="!profiles.loadingProfile"
                class="w-full h-auto relative p-4 flex flex-row justify-between items-start gap-2">
                <!-- Profile image -->
                <div class="h-full w-auto relative select-none">
                    <NuxtImg v-if="profiles.userProfile.image" :src="profiles.userProfile.image"
                        class="w-full max-w-[270px] h-full rounded aspect-square"
                        :alt="`${profiles.userProfile.firstname} ${profiles.userProfile.lastname} profile`" />
                    <div role="status" v-else class="w-full relative flex justify-center items-center flex-col">
                        <ClientOnly>
                            <Vue3Lottie :animationData="Loading" :height="80" :width="80" :loop="true" :autoPlay="true"
                                :speed="1" />
                        </ClientOnly>
                    </div>
                </div>

                <!-- Profile info container-->
                <div class="w-full h-full flex flex-col gap-2 px-4 justify-stretch items-stretch">
                    <h2 class="text-base font-medium text-gray-200 tracking-wide select-none">
                        {{ `${profiles.userProfile.firstname} ${profiles.userProfile.lastname}` }}
                        <span class="text-sm text-gray-500 block">
                            {{ profiles.userProfile.email }}
                        </span>
                    </h2>

                    <p class="min-h-[60px] max-h-[60px] overflow-auto text-sm font-normal text-gray-200 tracking-wide pb-2">
                        {{ profiles.userProfile.bio }}
                    </p>

                    <div v-if="profiles.userProfile.tasks > 0 || profiles.userProfile.projects > 0 || profiles.userProfile.organizations > 0"
                        class="w-full h-full border-t border-gray-700 flex justify-between select-none">
                        <div class="w-fit relative flex flex-row gap-4">
                            <p v-if="profiles.userProfile.tasks > 0"
                                class="inline-flex flex-col justify-center items-center px-0 py-2 text-base font-medium text-gray-300">
                                <span>
                                    {{ profiles.userProfile.tasks < 10 ? `0${profiles.userProfile.tasks}` :
                                        profiles.userProfile.tasks }} </span>
                                        <span class="text-sm text-gray-400">
                                            tasks
                                        </span>
                            </p>
                            <p v-if="profiles.userProfile.projects > 0"
                                class="inline-flex flex-col justify-center items-center px-0 py-2 text-base font-medium text-gray-300">
                                <span>
                                    {{ profiles.userProfile.projects < 10 ? `0${profiles.userProfile.projects}` :
                                        profiles.userProfile.projects }} </span>
                                        <span class="text-sm text-gray-400">
                                            projects
                                        </span>
                            </p>
                            <p v-if="profiles.userProfile.organizations > 0"
                                class="inline-flex flex-col justify-center items-center px-0 py-2 text-base font-medium text-gray-300">
                                <span>
                                    {{ profiles.userProfile.organizations < 10 ? `0${profiles.userProfile.organizations}` :
                                        profiles.userProfile.organizations }} </span>
                                        <span class="text-sm text-gray-400">
                                            organizations
                                        </span>
                            </p>
                        </div>

                        <!-- Manage link -->
                        <div class="w-fit h-auto flex justify-center items-center py-2">
                            <NuxtLink to="/admin" @click="popups.toggleUserProfile(0, false)"
                                class="text-base font-medium text-mystic-midnight p-2 rounded bg-tranquility flex justify-center items-center transition duration-120 hover:text-gray-200 hover:bg-emerald-splash">
                                Manage
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading content animation -->
            <div role="status" v-else class="w-full relative flex justify-center items-center flex-col">
                <ClientOnly>
                    <Vue3Lottie :animationData="Loading" :height="80" :width="80" :loop="true" :autoPlay="true"
                        :speed="1" />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>
<style lang="postcss"></style>