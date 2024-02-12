<script setup>
import { useProfilesStore } from '~/server/store/profiles';
import { useMemberstore } from '~/server/store/members';
import orgMembersListMenu from './org-members-list-menu.vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useOrgsStore } from '~/server/store/organizations';

const dayjs = useDayjs();
const members = useMemberstore();
const profiles = useProfilesStore();
const orgs = useOrgsStore();

dayjs.extend(relativeTime);

</script>
<template>
    <div v-if="members.orgMembers && members.orgMembers.length > 0"
        class="w-full max-w-2xl mx-auto flex flex-col justify-between items-center gap-3">
        <div v-for="(member, i) in members.orgMembers" :key="i"
            class="w-full p-2 flex flex-row justify-between items-center rounded border border-gray-700 shadow-md bg-deep-ocean-blue">

            <!-- Organization name and info -->
            <div class="w-full flex flex-col gap-0">
                <div class="w-full flex flex-col gap-0">
                    <div class="w-full flex flex-row items-center justify-start gap-3">
                        <NuxtImg :src="member.users.image"
                            class="w-[50px] h-[50px] rounded-full object-cover select-none" />
                        <h4
                            class="text-base font-medium text-left justify-start select-text text-gray-200 flex flex-col items-start justify-center">
                            <span class="inline-flex flex-row gap-1 items-center">
                                {{ member.users.firstname }} {{ member.users.lastname }}
                                <ClientOnly v-if="orgs.activeOrganization.creator_id === member.user_id">
                                    <a-tooltip placement="right">
                                        <template #title>
                                            <span class="text-center text-xs">
                                                Creator can only be removed by deleting the organization.
                                            </span>
                                        </template>
                                        <Icon name="material-symbols-light:admin-panel-settings-outline"
                                            class="w-5 h-5 text-gray-300" />
                                    </a-tooltip>
                                </ClientOnly>
                            </span>
                            <span class="text-xs text-gray-500">
                                Member since {{ dayjs(member.created_at).fromNow() }}
                            </span>
                        </h4>
                    </div>
                </div>
            </div>

            <orgMembersListMenu :member="member" v-if="members.orgMembers.some((member) => member.users.id === profiles.profile.user.id &&
                (member.role === 'admin' || member.role === 'moderator')) &&
                orgs.activeOrganization.creator_id !== member.user_id" />
        </div>
    </div>
</template>