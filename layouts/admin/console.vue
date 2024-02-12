<script setup>
import { usePopupsStore } from '~/server/store/popups';
import createTask from '~/partials/create-task.vue';
import createProject from '~/partials/create-project.vue';
import createOrganization from '~/partials/create-organization.vue';
import editProject from '~/partials/edit-project.vue';
import editTask from '~/partials/edit-task.vue';
import deleteProject from '~/partials/delete-project.vue';
import deleteTask from '~/partials/delete-task.vue';
import deleteCommentVue from '~/partials/delete-comment.vue';
import sidebarVue from "~/partials/sidebar.vue";
import topHeader from "~/partials/top-header.vue";
import inviteMembers from '~/partials/invite-members.vue';
import profileCard from '~/partials/profile-card.vue';
import orgUpdate from '~/partials/org-update.vue';
import deleteOrganization from '~/partials/delete-organization.vue';
import removeOrgMemberPopup from '~/partials/remove-org-member-popup.vue';
import adminOrgTab from '~/partials/admin-org-tab.vue';
import adminOrgMembersTab from '~/partials/admin-org-members-tab.vue';

const popups = usePopupsStore();
const tabKey = ref('1');


</script>
<template>
    <main class="w-full h-screen flex flex-row gap-0 flex-nowrap relative overflow-hidden">
        <!-- Sidebar container -->
        <ClientOnly>
            <sidebarVue />
        </ClientOnly>

        <!-- Main content section  -->
        <div class="w-full h-screen flex flex-col gap-0 relative overflow-auto overflow-x-hidden">
            <!-- Top header section -->
            <topHeader />

            <!-- Create project popup -->
            <createProject v-if="popups.newProjectVis" />

            <!-- Create new task popup -->
            <createTask v-if="popups.newTaskPopup" />

            <createOrganization v-if="popups.newOrganizationVis" />

            <editProject v-if="popups.editProjectPopup" />

            <deleteProject v-if="popups.deleteProjectPopup" />

            <deleteTask v-if="popups.deleteTaskPopup" />

            <editTask v-if="popups.editTaskPopup" />

            <deleteCommentVue v-if="popups.deleteCommentPopup.status" />

            <profileCard v-if="popups.userProfilePopup.status" />

            <orgUpdate v-if="popups.orgUpdatePopup.status" />

            <deleteOrganization v-if="popups.orgDeletePopup.status" />

            <removeOrgMemberPopup v-if="popups.removeOrgMemberPopup.status" />

            <inviteMembers />

            <div class="w-full px-6 py-2 relative">
                <ClientOnly>
                    <a-tabs v-model:activeKey="tabKey" centered animated
                        class="w-full max-w-2xl h-auto select-none mx-auto">
                        <a-tab-pane key="1" tab="Organizations">
                            <adminOrgTab />
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="Members">
                            <adminOrgMembersTab />
                        </a-tab-pane>
                    </a-tabs>
                </ClientOnly>
            </div>
        </div>
    </main>
</template>
<style lang="postcss">
div.ant-tabs-tab-btn {
    @apply text-white text-base;
}

div[aria-selected="true"].ant-tabs-tab-btn {
    color: #0F9690 !important;
}

div.ant-tabs-tab-btn:active {
    color: #0F9690 !important;
}

div.ant-tabs-ink-bar {
    background: #0F9690 !important;
}
</style>