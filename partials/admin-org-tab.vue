<script setup>
import organizationListMenu from '~/partials/organization-list-menu.vue';
import { useOrgsStore } from '~/server/store/organizations';
import { useProfilesStore } from '~/server/store/profiles';
import { useProjectsStore } from '~/server/store/projects';
import { useMemberstore } from '~/server/store/members';

const orgs = useOrgsStore();
const projects = useProjectsStore();
const members = useMemberstore();
const profiles = useProfilesStore();
const { $plural } = useNuxtApp()

const organizationProjectsCount = () => {
    return orgs.organizations.map(org => {
        // Filter projects for the current organization
        const projectsForOrg = projects.projects.filter(project => {
            return project.pivot.organization_id === org.id;
        });
        // Return the count of projects for the current organization
        return {
            orgId: org.id,
            projectsCount: projectsForOrg.length
        };
    });
}

const organizationMembersCount = () => {
    return orgs.organizations.map(org => {
        // Filter members for the current organization
        const membersForOrg = members.orgMembers.filter(member => {
            return member.memberable.id === org.id;
        });
        // Return the count of organization members
        return {
            orgId: org.id,
            membersCount: membersForOrg.length
        };
    });
}
</script>

<template>
    <div v-if="orgs.organizations && orgs.organizations.length > 0"
        class="w-full max-w-2xl mx-auto flex flex-col justify-between items-center gap-3">
        <div v-for="(org, i) in orgs.organizations" :key="i"
            class="w-full p-2 flex flex-row justify-between items-center rounded border border-gray-700 shadow-md bg-deep-ocean-blue">
            <!-- Organization name and info -->
            <div class="w-full flex flex-col gap-0">
                <div class="w-full flex flex-col gap-0 pb-2">
                    <h4
                        class="text-base font-medium select-text text-gray-200 flex flex-row gap-2 items-center justify-start">
                        {{ org.name }}
                        <ClientOnly
                            v-if="(members.orgMembers.some((member) => member.memberable.id === org.id &&
                                member.users.id === profiles.profile.user.id &&
                                member.role === 'admin')) &&
                                organizationProjectsCount().find(item => item.orgId === org.id)['projectsCount'] > 0">
                            <a-tooltip placement="right">
                                <template #title>
                                    <span class="text-center text-xs">
                                        You can't delete organizations with active projects.
                                    </span>
                                </template>
                                <Icon name="heroicons:exclamation-circle" class="w-4 h-4 text-gray-300" />
                            </a-tooltip>
                        </ClientOnly>
                    </h4>
                    <p class="text-sm text-gray-400 select-text" v-if="org.description">
                        {{ org.description }}
                    </p>
                </div>
                <p class="flex flex-row gap-4 text-gray-400">
                    <span class="text-xs text-gray-400 font-medium">
                        {{ $plural(organizationMembersCount().find(item => item.orgId ===
                            org.id).membersCount, 'Member') }} </span>
                    <span v-if="organizationProjectsCount().find(item => item.orgId ===
                        org.id).projectsCount > 0" class="text-xs text-gray-400 font-medium">
                        {{ $plural(organizationProjectsCount().find(item => item.orgId ===
                            org.id).projectsCount,
                            'Project') }} </span>
                    <span v-else class="text-xs text-gray-400 font-medium">
                        No Project
                    </span>
                </p>
            </div>

            <!-- conditional menu list IF role of the current user of the current organization is "admin" -->
            <organizationListMenu :organization="org"
                :projectCount="organizationProjectsCount().find(item => item.orgId === org.id)['projectsCount']" v-if="members.orgMembers.some((member) => member.memberable.id === org.id &&
                    member.users.id === profiles.profile.user.id &&
                    member.role === 'admin')" />
        </div>
    </div>
</template>