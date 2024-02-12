<script setup>
import useOrganizations from '~/composables/organizations';
import { useOrgsStore } from '~/server/store/organizations';
import { usePopupsStore } from '~/server/store/popups';


const popups = usePopupsStore();
const { deleteOrganization } = useOrganizations();
const orgs = useOrgsStore();

const deleteOrg = async (id) => {
    await deleteOrganization(id).finally(() => {
        if (orgs.outputCode === 200) {
            closePopup();
        }
    })
}

const closePopup = () => {
    popups.toggleOrgDeletePopup('', false);
    orgs.setMessages('');
    orgs.setOutputCode(0);
}


</script>

<template>
    <div
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <form method="POST" class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade p-4"
            @submit.prevent="deleteOrg(popups.orgDeletePopup.id)">
            <div class="w-full felx flex-row justify-between items-center border-b border-gray-700">
                <h2 class="text-lg font-bold text-red-400 py-2">
                    Delete Organization
                </h2>
            </div>
            <p class="text-base font-medium text-gray-300 py-2">
                Deleting this organization will permanently remove all associated members.
            </p>
            <div class="w-full flex flex-row justify-end items-center gap-2">
                <a-button type="ghost" htmlType="button" @click="closePopup()"
                    :disabled="orgs.loading"
                    class="w-fit h-auto flex justify-center items-center p-2 rounded bg-transparent text-gray-400 text-base font-medium disabled:opacity-50">
                    Cancel
                </a-button>
                <a-button type="ghost" htmlType="submit" :disabled="orgs.loading"
                    class="w-fit h-auto flex justify-center items-center p-2 rounded bg-transparent text-red-500 text-base font-medium disabled:opacity-50">
                    Delete
                </a-button>
            </div>

            <div
                :class="`w-full px-4 pb-4 text-base font-medium ${orgs.outputCode == 200 ? 'text-green-500' : 'text-red-400'}`">
                <ul v-if="Array.isArray(orgs.messages)">
                    <li v-for="message in orgs.messages" :key="message">
                        &cross;&nbsp;{{ message }}
                    </li>
                </ul>
                <p v-else>
                    {{ orgs.messages }}
                </p>
            </div>
        </form>
    </div>
</template>