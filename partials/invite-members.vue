<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';
import { useMemberstore } from '~/server/store/members';
import useInvitations from '~/composables/invitations';

const popups = usePopupsStore();
const inviteMemberRef = ref(null);
const { invitation } = useInvitations();

const inviteesTags = {
    mode: 'tags',
    value: [],
    closeOnSelect: false,
    options: [],
    placeholder: 'Invite Members',
    searchable: true,
    createOption: true,
}
onClickOutside(inviteMemberRef,
    () => {
        popups.toggleMemberInvitation(false);
    })
</script>

<template>
    <div v-if="popups.memberInvitation"
        class="w-full h-full fixed top-0 left-0 z-[9999999] bg-mystic-midnight bg-opacity-50 backdrop-blur flex justify-center items-center">
        <form method="post" @submit.prevent="invitation(inviteesTags.value)"
            class="w-full max-w-[512px] p-2 bg-light-ocean-blue rounded shadow-lg border border-gray-700"
            ref="inviteMemberRef">
            <h2 class="w-full text-base text-left font-bold tracking-wide text-gray-300 p-2">
                Invite Members
            </h2>
            <p class="p-2 text-base font-medium text-gray-300 select-text">
                Please enter email adress of users you want to invite:
            </p>
            <div class="w-full p-2" id="inviteMembers">
                <Multiselect v-model="inviteesTags.value" v-bind="inviteesTags"></Multiselect>
            </div>
            <div class="w-full p-2">
                <button type="submit"
                    class="w-full h-auto bg-transparent p-2 text-base text-gray-300 rounded active:bg-deep-teal font-medium border-none outline-none hover:bg-deep-teal">
                    Send Invitation
                </button>
            </div>
        </form>
    </div>
</template>
<style lang="postcss">
#inviteMembers .multiselect {
    @apply bg-deep-ocean-blue border-none shadow-none ml-0 max-h-[38px] shadow-md
}

#inviteMembers .multiselect-tag {
    @apply bg-tranquility
}

#inviteMembers .multiselect-tags-search {
    background-color: transparent !important;
    @apply rounded ring-0 outline-none text-gray-300
}

#inviteMembers .multiselect-search {
    background-color: transparent !important;
    @apply text-gray-300;
}

#inviteMembers .multiselect-multiple-label {
    @apply text-gray-300;
}

#inviteMembers .multiselect-dropdown {
    @apply bg-deep-ocean-blue border border-gray-700 shadow-md overflow-auto
}

#inviteMembers .multiselect-options li {
    @apply bg-deep-ocean-blue border-b border-gray-700 text-gray-300 hover:bg-light-ocean-blue last:border-none
}

#inviteMembers .multiselect-no-results {
    @apply bg-deep-ocean-blue border-none text-gray-500 shadow-md
}
</style>