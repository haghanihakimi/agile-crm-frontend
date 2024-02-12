<script setup>
import { ref } from 'vue';
import useOrganizations from '~/composables/organizations';
import { useOrgsStore } from '~/server/store/organizations';
import { usePopupsStore } from '~/server/store/popups';

const popups = usePopupsStore();
const { updateOrganization } = useOrganizations();
const orgs = useOrgsStore();

const orgId = ref(popups.orgUpdatePopup.id);
const orgName = ref(popups.orgUpdatePopup.name);
const orgDescription = ref(popups.orgUpdatePopup.description);

const updateOrg = async (id, name, description) => {
    await updateOrganization(id, name, description)
}

const closePopup = () => {
    popups.toggleOrgUpdatePopup('', '', '', false);
    orgs.setMessages('');
    orgs.setOutputCode(0);
}

</script>

<template>
    <div
        class="w-full h-full top-0 left-0 fixed flex items-center justify-center z-40 bg-mystic-midnight bg-opacity-5 backdrop-blur-sm">
        <form method="PATCH" @submit.prevent="updateOrg(orgId, orgName, orgDescription)"
            class="w-full animate-popupFade max-w-xl bg-deep-ocean-blue flex flex-col gap-2 rounded shadow-md border border-gray-700">
            <div class="w-full flex flex-row justify-between items-center p-4 border-b border-gray-700">
                <h3 class="w-full text-base font-bold text-gray-300">
                    Update organization
                </h3>
                <a-button type="ghost" class="w-6 h-6 flex justify-center items-center p-0 m-0" @click="closePopup()">
                    <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-400" />
                </a-button>
            </div>

            <div class="w-full relative p-4 flex flex-col gap-7">
                <div class="w-full relative flex-1 min-w-[160px]">
                    <input type="text" id="fristname" autocomplete="false" v-model="orgName" :disabled="orgs.loading"
                        class="min-h-[38px] block px-2 w-full text-base font-medium tracking-wide text-gray-200 bg-deep-teal rounded border-1 border-gray-700 appearance-none transition duration-200 ring-8 ring-transparent focus:bg-deep-teal focus:ring-2 focus:ring-tranquility focus:outline-none peer disabled:opacity-50"
                        placeholder=" " />
                    <label for="fristname"
                        class="absolute select-none cursor-text text-base text-gray-300 duration-200 transform -translate-y-8 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Organization Name
                    </label>
                </div>
                <div class="w-full relative flex-1 min-w-[160px]">
                    <textarea id="description" autocomplete="false" v-model="orgDescription" :disabled="orgs.loading"
                        class="min-h-[72px] block px-2 w-full resize-vertical max-h-[200px] text-base font-medium tracking-wide text-gray-200 bg-deep-teal rounded border-1 border-gray-700 appearance-none transition duration-200 ring-8 ring-transparent focus:bg-deep-teal focus:ring-2 focus:ring-tranquility focus:outline-none peer disabled:opacity-50"
                        placeholder=" "></textarea>
                    <label for="description"
                        class="absolute select-none cursor-text text-base text-gray-300 duration-200 transform -translate-y-8 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-7 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:bg-opacity-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        Organization Description
                    </label>
                </div>
            </div>

            <div class="w-full flex flex-row justify-end items-center gap-2 py-4 px-4">
                <a-button type="ghost" @click="closePopup()" :disabled="orgs.loading"
                    class="w-fit text-base font-medium text-slate-900 px-2 py-4 rounded m-0 bg-emerald-splash flex justify-center items-center disabled:opacity-50">
                    Cancel
                </a-button>
                <a-button type="ghost" htmlType="submit" :disabled="orgs.loading"
                    class="w-fit text-base font-medium text-slate-900 px-2 py-4 rounded m-0 bg-tranquility flex justify-center items-center disabled:opacity-50">
                    Save Changes
                </a-button>
            </div>

            <div v-if="orgs.messages.length > 0"
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