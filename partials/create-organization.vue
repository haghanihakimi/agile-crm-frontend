<script setup>
import { ref } from 'vue';
import useOrganizations from '~/composables/organizations';
import { usePopupsStore } from '~/server/store/popups';
import { useOrgsStore } from '~/server/store/organizations';

const popups = usePopupsStore();
const orgs = useOrgsStore();
const router = useRouter();

const inputs = ref({
    name: '',
    description: '',
});

const { createOrganization } = useOrganizations();

const createNewOrganization = () => {
    createOrganization(inputs.value).finally(() => {
        inputs.value.name = '';
        inputs.value.description = '';
    })
}
</script>

<template>
    <div v-if="popups.newOrganizationVis"
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <div class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade">
            <!-- popup title & control -->
            <div class="w-full flex flex-row justify-between items-center p-4">
                <!--  -->
                <h2 class="w-full relative text-md tracking-wide font-bold text-gray-300">
                    New Organization
                </h2>
                <a-button type="button" @click="popups.toggleOrganizationPopup(false)" :disabled="orgs.loading"
                    v-if="router.currentRoute.value.name !== 'organization-new-create'"
                    class="w-8 h-8 shrink-0 m-0 p-0 rounded bg-light-ocean-blue rounded border-none ring-0 flex items-center justify-center">
                    <Icon name="heroicons:x-mark" class="text-lg text-gray-300" />
                </a-button>
            </div>

            <!--  -->
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
        </div>
    </div>
</template>