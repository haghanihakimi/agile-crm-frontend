<script setup>
import { ref, reactive } from 'vue';
import useProjects from '~/composables/projects';
import { usePopupsStore } from '~/server/store/popups';
import { useProjectsStore } from '~/server/store/projects';


const popups = usePopupsStore();
const projects = useProjectsStore();
const { deleteProject } = useProjects();


</script>

<template>
    <div v-if="popups.deleteProjectPopup"
        class="w-full h-full flex flex-col justify-center items-center bg-mystic-midnight bg-opacity-75 backdrop-blur fixed top-0 left-0 z-50">
        <form method="POST" class="w-full max-w-2xl bg-light-ocean-blue rounded shadow-lg animate-popupFade p-4"
            @submit.prevent="deleteProject()">
            <div class="w-full felx flex-row justify-between items-center border-b border-gray-700">
                <h2 class="text-lg font-bold text-red-400 py-2">
                    Delete Project
                </h2>
            </div>
            <p class="text-base font-medium text-gray-300 py-2">
                You're about to delete the <strong>'{{projects.selectedProject.title}}'</strong> project.<br />This action is irreversible, and
                the project, along
                with all related <strong>tasks</strong>, will be permanently deleted.
            </p>
            <div class="w-full flex flex-row justify-end items-center gap-2">
                <a-button type="ghost" htmlType="button" @click="popups.toggleDeleteProjectPopup(false)"
                    :disabled="projects.deletingProject"
                    class="w-fit h-auto flex justify-center items-center p-2 rounded bg-transparent text-gray-400 text-base font-medium disabled:opacity-50">
                    Cancel
                </a-button>
                <a-button type="ghost" htmlType="submit" @click="popups.toggleDeleteProjectPopup(true)"
                    :disabled="projects.deletingProject"
                    class="w-fit h-auto flex justify-center items-center p-2 rounded bg-transparent text-red-500 text-base font-medium disabled:opacity-50">
                    Delete Project
                </a-button>
            </div>
        </form>
    </div>
</template>