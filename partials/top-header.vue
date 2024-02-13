<script setup>
import { ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import { debounce } from 'lodash';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';
import { useOrgsStore } from '~/server/store/organizations';
import BtnGeneral from '~/components/buttons/general.vue';
import { useMemberstore } from '~/server/store/members';
import { useProfilesStore } from '~/server/store/profiles';
import useUsers from '~/composables/users';
import useSearch from '~/composables/search';
import { useSearchStore } from '~/server/store/search';
import Loading from "~/assets/images/loading.json";

const dateNow = new Date();
const dayjs = useDayjs();
const router = useRouter();
const profileMenuRef = ref(null);
const profileMenuVis = ref(false);
const createNewMenuRef = ref(null);
const createNewMenuVis = ref(false);
const searchResultRef = ref(null);
const searchResultsList = ref(false);
const popups = usePopupsStore();
const organizations = useOrgsStore();
const members = useMemberstore();
const profiles = useProfilesStore();
const { signOut } = useUsers();
const { $dayTime, $fetchData } = useNuxtApp()
const { search } = useSearch();
const searches = useSearchStore();

onClickOutside(profileMenuRef, () => {
    profileMenuVis.value = false
})
onClickOutside(createNewMenuRef, () => {
    createNewMenuVis.value = false
})
onClickOutside(searchResultRef, () => {
    searchResultsList.value = false
})

const searchDebounce = debounce((query) => {
    search(query).finally(() => {
        if (searches.results.length > 0) {
            searchResultsList.value = true;
        } else {
            searchResultsList.value = false
        }
    })
}, 750);

const searchQuery = (input) => {
    searchDebounce(input)
}

onMounted(() => {
    $fetchData();
})
</script>

<template>
    <div id="top-header-container" class="w-full bg-mystic-midnight select-none sticky top-0 right-0 p-4 z-20">
        <div class="w-full relative flex flex-row gap-0 justify-between items-center">
            <!-- Welcoming text section -->
            <div class="w-fit px-2 shrink-0 flex flex-col items-start justify-start px-2">
                <h2 class="text-lg text-white font-bold tracking-wide">
                    Good {{ $dayTime() }}, {{ profiles.profile.user.firstname }}
                </h2>
                <span class="text-sm text-gray-300 px-1">
                    {{ dayjs(dateNow).format("dddd, MMMM DD") }}
                </span>
            </div>
            <!-- search bar and members section -->
            <div class="w-full flex flex-row justify-center items-center gap-2 px-2">
                <div class="w-full max-w-xl relative">
                    <!-- Search -->
                    <div class="w-full relative">
                        <input type="text" placeholder="Search Projects, Tasks & People..."
                            @input="(e) => { searchQuery(e.target.value) }" @click="searchResultsList = true"
                            class="w-full h-10 shadow-md rounded bg-deep-ocean-blue pl-4 pr-14 border border-gray-700 text-base text-gray-200 ring-8 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility" />
                        <div class="w-auto h-10 flex flex-row gap-0 rounded-tr rounded-br absolute top-0 right-0">
                            <!-- <BtnGeneral :type="'button'" :width="'w-10'" :height="'h-10'" :px="'px-1'" :py="'py-1'"
                                :radius="'rounded-none'">
                                <Icon name="heroicons:funnel" class="text-xl text-gray-300" />
                            </BtnGeneral> -->
                            <BtnGeneral :type="'button'" :width="'w-10'" :height="'h-10'" :px="'px-1'" :py="'py-1'"
                                :radius="'rounded-tr rounded-br border-l border-gray-700'">
                                <Icon name="heroicons:magnifying-glass" class="text-xl text-gray-300" />
                            </BtnGeneral>
                        </div>
                        <!-- results container -->
                        <div v-if="(searches.results && searches.results.length > 0 && searchResultsList) ||
                            searches.searching" ref="searchResultRef"
                            class="w-full max-h-[480px] overflow-auto overeflow-x-hidden top-11 rounded shadow-md bg- absolute bg-deep-ocean-blue border border-gray-700">
                            <ul v-if="searches.results && searches.results.length > 0 && !searches.searching">
                                <li class="block" v-for="(result, i) in searches.results" :key="i">
                                    <NuxtLink to="/" class="text-gray-300 font-medium text-base p-2 block"
                                        v-if="result.task_uuid">
                                        Task: {{ result.title }}
                                    </NuxtLink>
                                    <NuxtLink to="/" class="text-gray-300 font-medium text-base p-2 block"
                                        v-if="result.project_uuid">
                                        Project: {{ result.title }}
                                    </NuxtLink>
                                    <NuxtLink to="/"
                                        class="w-full text-gray-300 font-medium text-base p-2 inline-flex flex-row items-center justify-start gap-2"
                                        v-if="result.email">
                                        <NuxtImg :src="result.image" class="w-8 h-8 rounded-full object-cover shrink-0" />
                                        <span>
                                            {{ result.firstname }} {{ result.lastname }}
                                        </span>
                                    </NuxtLink>
                                </li>
                            </ul>
                            <div class="w-fit flex justify-start items-start" v-if="searches.searching">
                                <ClientOnly>
                                    <Vue3Lottie :animationData="Loading" :height="40" :width="40" :loop="true"
                                        :autoPlay="true" :speed="1" />
                                </ClientOnly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- profile image; organization members; btn create new section -->
            <div class="w-fit px-2 shrink-0 relative flex flex-row items-center justify-between gap-2">
                <!-- Organization members container -->
                <ClientOnly>
                    <a-skeleton-button v-if="members.loadingMembers" :active="members.loadingMembers" size="large"
                        shape="circle" block="block" />
                    <a-avatar-group v-else :max-count="1" max-popover-trigger="click" size="medium"
                        :max-style="{ color: '#ffffff', backgroundColor: '#0F9690', cursor: 'pointer' }">
                        <a-tooltip placement="top" v-for="member in members.orgMembers" :key="member.id"
                            :title="`${member.users.firstname} ${member.users.lastname}`">
                            <a-avatar :src="member.users.image" :gap="1" style="background-color: #0C7075">
                                <template #icon>
                                    <AntDesignOutlined />
                                </template>
                            </a-avatar>
                        </a-tooltip>
                    </a-avatar-group>
                </ClientOnly>

                <!-- btn create new container -->
                <div class="w-auto shrink-0 rounded-full bg-green-700 relative">
                    <BtnGeneral @click="createNewMenuVis = !createNewMenuVis" :type="'button'" :px="'px-0'" :py="'py-0'"
                        :width="'w-8'" :height="'h-8'" :background="'bg-deep-ocean-blue'" :radius="'rounded-full'">
                        <Icon name="heroicons:plus-20-solid" class="text-xl" />
                    </BtnGeneral>
                    <div ref="createNewMenuRef" v-if="createNewMenuVis"
                        class="w-full max-w-[220] min-w-[220px] animate-profileMenuFade flex flex-col gap-0 absolute top-10 -right-4 rounded bg-deep-ocean-blue shadow-md border border-gray-800">
                        <!-- profile image and name -->
                        <a-button @click="popups.toggleNewTaskPopup(true)" type="ghost"
                            v-if="router.currentRoute.value.name === 'board-org-project'"
                            class="rounded-none rounded-tr rounded-tl border-none py-5 text-left text-base text-gray-300 flex justify-start items-center transition duration-200 hover:bg-emerald-splash disabled:opacity-50">
                            <Icon name="heroicons:plus-20-solid" class="text-xl" />
                            <span>
                                New Task
                            </span>
                        </a-button>
                        <a-button type="ghost" @click="popups.toggleNewProjectPopup(true)"
                            class="rounded-none rounded-br rounded-bl border-none py-5 text-left text-base text-gray-300 flex justify-start items-center transition duration-200 hover:bg-emerald-splash disabled:opacity-50">
                            <Icon name="heroicons:plus-20-solid" class="text-xl" />
                            <span>
                                New Project
                            </span>
                        </a-button>
                    </div>
                </div>

                <!-- Profile image & profile menu container -->
                <div class="w-full relative">
                    <BtnGeneral @click="profileMenuVis = !profileMenuVis" :type="'button'" :px="'px-0'" :py="'py-0'">
                        <NuxtImg :src="profiles.profile.user.image" class="w-8 h-8 object-cover rounded-full" />
                    </BtnGeneral>

                    <div ref="profileMenuRef" v-if="profileMenuVis"
                        class="w-full max-w-[280] min-w-[280px] animate-profileMenuFade flex flex-col gap-0 absolute top-10 -right-2 rounded bg-deep-ocean-blue shadow-md border border-gray-800">
                        <!-- profile image and name -->
                        <NuxtLink to="/settings"
                            class="w-full p-2 flex flex-row gap-2 items-center justify-start rounded-tl rounded-tr text-gray-200 font-medium text-md tracking-wide border-b border-gray-700 transition duration-200 hover:bg-emerald-splash">
                            <NuxtImg :src="profiles.profile.user.image"
                                class="w-8 h-8 rounded-full shrink-0 object-cover" />
                            <span>
                                {{ `${profiles.profile.user.firstname} ${profiles.profile.user.lastname}` }}
                            </span>
                        </NuxtLink>

                        <div class="w-full relative border-b border-gray-700">
                            <span class="px-4 py-2 text-sm text-gray-400 block">Organizations</span>
                            <div class="w-full relative" v-if="organizations.organizations.length > 0">
                                <a v-for="org in organizations.organizations" :key="org.id" target="_self"
                                    :href="`/board/${org.org_uuid}`"
                                    class="w-full py-2 px-4 flex flex-row gap-2 items-center justify-between text-gray-200 font-base text-md tracking-wide rounded-none transition duration-200 hover:bg-emerald-splash">
                                    <span>
                                        {{ org.name }}
                                    </span>
                                    <Icon v-if="org.org_uuid === organizations.activeOrganization.org_uuid"
                                        name="heroicons:check-solid" class="text-xl" />
                                </a>
                            </div>
                        </div>

                        <div class="w-full relative border-b border-gray-700">
                            <button type="ghost" @click="popups.toggleOrganizationPopup(true)"
                                class="w-full py-2 px-4 flex flex-row gap-2 items-center justify-start text-gray-200 font-medium text-base tracking-wide transition duration-200 hover:bg-emerald-splash">
                                <Icon name="heroicons:plus-20-solid" class="text-xl" />
                                <span>
                                    New Organization
                                </span>
                            </button>
                            <NuxtLink to="/admin"
                                class="w-full py-2 px-4 flex flex-row gap-2 items-center justify-start text-gray-200 font-medium text-base tracking-wide transition duration-200 hover:bg-emerald-splash">
                                <Icon name="eos-icons:admin-outlined" />
                                <span>
                                    Admin Console
                                </span>
                            </NuxtLink>
                            <NuxtLink to="/settings"
                                class="w-full py-2 px-4 flex flex-row gap-2 items-center justify-start text-gray-200 font-medium text-base tracking-wide transition duration-200 hover:bg-emerald-splash">
                                <Icon name="heroicons:cog-8-tooth" class="text-xl" />
                                Settings
                            </NuxtLink>
                        </div>

                        <form class="w-full relative" method="POST" @submit="signOut()">
                            <a-button type="ghost" htmlType="submit"
                                class="w-full flex flex-row items-center justify-start gap-2 px-4 py-5 rounded-none text-gray-200 font-normal text-base tracking-wide transition duration-200 hover:bg-emerald-splash">
                                <Icon name="heroicons:arrow-left-on-rectangle" class="text-xl" />
                                <span>
                                    Log Out
                                </span>
                            </a-button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="postcss" scoped>
div.ant-popover-inner {
    background-color: #072e33 !important;
}

.ant-popover-inner,
.ant-popover-arrow::before {
    background: #063537 !important;
}
</style>