<script setup>
import { ref } from 'vue';
import useOrganizations from '~/composables/organizations';
import { usePopupsStore } from '~/server/store/popups';
import { useOrgsStore } from '~/server/store/organizations';
import { useMemberstore } from '~/server/store/members';
import useInvitations from '~/composables/invitations';

const popups = usePopupsStore();
const orgs = useOrgsStore();
const router = useRouter();
const activeKey = ref('1');
const members = useMemberstore();
const { createOrganization } = useOrganizations();
const { getInvitations, acceptInvitation, rejectInvitation } = useInvitations();

const inputs = ref({
    name: '',
    description: '',
});

const createNewOrganization = () => {
    createOrganization(inputs.value).finally(() => {
        inputs.value.name = '';
        inputs.value.description = '';
    })
}

const fetchInvitations = () => {
    if (activeKey.value == 2) {
        getInvitations();
    }
}
</script>

<template>
    <div v-if="popups.newOrganizationVis"
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <div class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade">
            <div v-if="router.currentRoute.value.name !== 'organization-new-create'"
                class="w-full flex justify-end items-center px-4 pt-4">
                <a-button type="button" @click="popups.toggleOrganizationPopup(false)" :disabled="orgs.loading"
                    class="w-8 h-8 shrink-0 m-0 p-0 rounded bg-light-ocean-blue rounded border-none ring-0 flex items-center justify-center">
                    <Icon name="heroicons:x-mark" class="text-lg text-gray-300" />
                </a-button>
            </div>
            <ClientOnly>
                <a-tabs v-model:activeKey="activeKey" centered animated class="overflow-hidden"
                    @change="() => { fetchInvitations() }">
                    <a-tab-pane key="1" tab="Create Organization">
                        <!-- popup title & control -->
                        <div class="w-full flex flex-row justify-between items-center p-4">
                            <!--  -->
                            <h2 class="w-full relative text-md tracking-wide font-bold text-gray-300">
                                New Organization
                            </h2>
                        </div>

                        <div class="w-full flex flex-col gap-4 p-4">
                            <div class="w-full flex flex-col gap-1">
                                <label for="org_name" class="w-full text-base text-gray-300 font-medium select-none">
                                    Organization Name
                                </label>
                                <input type="text" placeholder="Organization Name" id="org_name" v-model="inputs.name"
                                    :disabled="orgs.loading"
                                    class="w-full min-h-[38px] rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                            </div>
                            <div class="w-full flex flex-col gap-1">
                                <label for="org_description" class="w-full text-base text-gray-300 font-medium select-none">
                                    Organization Description
                                </label>
                                <textarea id="org_description" v-model="inputs.description" :disabled="orgs.loading"
                                    class="w-full min-h-[150px] max-h-[200px] resize-none rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none"></textarea>
                            </div>

                            <div class="w-full flex justify-end items-center">
                                <a-button type="button" @click="createNewOrganization()" :disabled="orgs.loading"
                                    class="w-fit h-auto p-2 rounded bg-emerald-splash text-gray-300 text-base font-medium disabled:opacity-50">
                                    Create Organization
                                </a-button>
                            </div>

                            <div class="w-full text-base font-medium text-red-500">
                                <ul v-if="Array.isArray(orgs.messages)">
                                    <li v-for="message in orgs.messages" :key="message">
                                        &cross;&nbsp;{{ message }}
                                    </li>
                                </ul>
                                <p v-else>
                                    {{ orgs.messages }}
                                </p>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Pending Invitations">
                        <div class="w-full flex flex-col gap-0" v-if="members.pendingInvitations.length > 0">
                            <div v-for="(invitation, i) in members.pendingInvitations" :key="i"
                                class="w-full flex flex-row justify-between items-center text-gray-200 px-4 py-2 border-b border-gray-700 last:border-none last:pb-4">
                                <p>
                                    Join {{ invitation.tokenable.name }}
                                    {{ invitation.invited_for === 'Organization' ? 'organization' : '' }}
                                </p>
                                <div class="w-fit flex flex-row items-center gap-1 justify-between">
                                    <form @submit.prevent="acceptInvitation(invitation.id)"><a-button type="ghost"
                                            htmlType="submit" class="text-gray-200 font-medium text-base bg-inherit">
                                            Accept
                                        </a-button></form>
                                    <form @submit.prevent="rejectInvitation(invitation.id)"><a-button type="ghost"
                                            htmlType="submit"
                                            class="w-4 h-4 m-0 flex justify-center items-center text-gray-200 font-medium text-base px-0 py-0 bg-inherit">
                                            <Icon name="heroicons:x-mark" class="w-4 h-4 text-gray-300" />
                                        </a-button></form>
                                </div>
                            </div>
                        </div>

                        <h3 v-else class="w-full font-bold text-gray-400 p-4 text-center text-base">
                            No pending invitations found!
                        </h3>

                        <div class="w-full flex flex-col gap-0" v-if="orgs.organizations.length > 0">
                            <div v-for="(organization, i) in orgs.organizations" :key="i"
                                class="w-full flex flex-row justify-between items-center text-gray-200 px-4 py-2 border-b border-gray-700 last:border-none last:pb-4">
                                <span>
                                    {{ organization.name }} organization
                                </span>
                                <div class="w-fit flex flex-row items-center gap-1 justify-between">
                                    <NuxtLink :to="`/board/${organization.org_uuid}`"
                                        class="text-gray-200 font-medium text-base bg-inherit">
                                        View
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </ClientOnly>
        </div>
    </div>
</template>
<style lang="postcss">
div.ant-tabs-tab-btn {
    @apply text-white text-base;
}

div[aria-selected="true"].ant-tabs-tab-btn {
    color: #0F9690 !important;
}

div.ant-tabs-ink-bar {
    background: #0F9690 !important;
}
</style>