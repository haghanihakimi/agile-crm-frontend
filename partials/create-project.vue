<script setup>
import { ref, reactive } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { usePopupsStore } from '~/server/store/popups';
import { useProjectsStore } from '~/server/store/projects';
import { useOrgsStore } from '~/server/store/organizations';
import useProjects from '~/composables/projects';

const popups = usePopupsStore();
const privacyMenuRef = ref(null);
const privacyMenuVis = ref(false);
const projectPrivacy = ref("Public");
const projects = useProjectsStore();
const organizations = useOrgsStore();
const { createProject } = useProjects();
const router = useRouter();

const toggleProjectPrivacy = privacy => {
    projectPrivacy.value = privacy;
    privacyMenuRef.value = null;
    privacyMenuVis.value = false;
    newProjectData.privacy = privacy === "Public" ? false : true;
};

const newProjectData = reactive({
    title: '',
    description: '',
    privacy: false,
    budget: 0,
    org: organizations.activeOrganization?.org_uuid,
});

const createNewProject = () => {
    createProject(newProjectData).finally(() => {
        newProjectData.title = '';
        newProjectData.description = '';
        newProjectData.privacy = false;
        newProjectData.budget = 0;
        projectPrivacy.value = "Public";
    });
}

onClickOutside(privacyMenuRef,
    () => {
        privacyMenuVis.value = false;
    });
</script>

<template>
    <div v-if="popups.newProjectVis"
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <form method="POST" class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade"
            @submit.prevent="createNewProject()">
            <!-- popup title & control -->
            <div class="w-full flex flex-row justify-between items-center p-4">
                <!--  -->
                <h2 class="w-full relative text-md tracking-wide font-bold text-gray-300">
                    New Project
                </h2>
                <a-button type="button" @click="popups.toggleNewProjectPopup(false);projects.setMessages('')"
                    class="w-8 h-8 shrink-0 m-0 p-0 rounded bg-light-ocean-blue rounded border-none ring-0 flex items-center justify-center">
                    <Icon name="heroicons:x-mark" class="text-lg text-gray-300" />
                </a-button>
            </div>

            <!--  -->
            <div class="w-full flex flex-col gap-4 p-4">
                <div class="w-full flex flex-col gap-1">
                    <label for="project_name" class="w-full text-base text-gray-300 font-medium select-none">
                        Project Name
                    </label>
                    <input type="text" placeholder="Task Title" id="project_name" v-model="newProjectData.title"
                        class="w-full min-h-[px] rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                </div>
                <div class="w-full flex flex-col gap-1">
                    <label for="project_name" class="w-full text-base text-gray-300 font-medium select-none">
                        Project Description
                    </label>
                    <textarea v-model="newProjectData.description"
                        class="w-full min-h-[90px] resize-none rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none"></textarea>
                </div>
                <div class="w-full flex flex-row gap-4 items-center justify-start">
                    <div class="w-fit flex flex-col gap-1">
                        <label for="privacy" class="w-full text-base text-gray-300 font-medium select-none">
                            Privacy
                        </label>
                        <div @click="privacyMenuVis = true"
                            class="w-fit h-auto p-2 rounded border border-gray-700 shadow-md relative cursor-pointer select-none">
                            <span class="flex flex-row items-center gap-2 text-gray-300">
                                <Icon v-if="projectPrivacy === 'Public'" name="heroicons:user-group-20-solid"
                                    class="text-lg text-gray-300 shrink-0" />
                                <Icon v-if="projectPrivacy === 'Private'" name="heroicons:lock-closed-20-solid"
                                    class="text-lg text-gray-300 shrink-0" />
                                {{ projectPrivacy }}
                                <Icon name="heroicons:chevron-down-20-solid" class="text-lg text-gray-300 shrink-0" />
                            </span>
                            <div ref="privacyMenuRef" v-if="privacyMenuVis"
                                class="w-full min-w-[200px] animate-popupFade absolute top-11 left-0 bg-light-ocean-blue rounded shadow-md border border-gray-700">
                                <ul>
                                    <li @click.stop="toggleProjectPrivacy('Public')"
                                        class="rounded-tr rounded-tl block p-2 text-gray-300 flex flex-row items-center justify-start gap-2 border-b border-gray-700 transition duration-120 last:border-none hover:bg-deep-teal">
                                        <Icon name="heroicons:user-group-20-solid" class="text-lg text-gray-300 shrink-0" />
                                        Public
                                    </li>
                                    <li @click.stop="toggleProjectPrivacy('Private')"
                                        class="rounded-br rounded-bl block p-2 text-gray-300 flex flex-row items-center justify-start gap-2 border-b border-gray-700 transition duration-120 last:border-none hover:bg-deep-teal">
                                        <Icon name="heroicons:lock-closed-20-solid"
                                            class="text-lg text-gray-300 shrink-0" />
                                        Private
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="w-fit flex flex-col gap-1">
                        <label for="privacy" class="w-full text-base text-gray-300 font-medium select-none">
                            Budget
                        </label>
                        <input type="number" placeholder="Budget" v-model="newProjectData.budget"
                            class="w-fit max-w-[90px] min-h-[41px] h-8 no-arrow rounded text-base tracking-wide font-medium text-gray-300 bg-deep-ocean-blue border border-gray-700 shadow-md ring-4 ring-transparent transition duration-200 focus:ring-1 focus:ring-tranquility focus:outline-none" />
                    </div>
                </div>

                <div class="w-full flex justify-end items-center">
                    <a-button type="ghost" htmlType="submit" :disabled="projects.creatingProject"
                        class="w-fit h-auto p-2 rounded bg-emerald-splash text-gray-300 text-base font-medium disabled:opacity-50">
                        Create Project
                    </a-button>
                </div>

                <div class="w-full text-base font-medium text-red-500">
                    <ul v-if="Array.isArray(projects.messages)">
                        <li v-for="message in projects.messages" :key="message">
                            &cross;&nbsp;{{ message }}
                        </li>
                    </ul>
                    <p v-else>
                        {{ projects.messages }}
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>