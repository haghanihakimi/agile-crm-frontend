import useOrganizations from '~/composables/organizations';
import useProjects from '~/composables/projects';
import useMembers from '~/composables/members';

export default defineNuxtPlugin(async () => {
    return {
        provide: {
            fetchData: async () => {
                const { getOrganizations, getCurrentOrganization } = useOrganizations();
                const { getProjects } = useProjects();
                const { getOrgMembers } = useMembers();

                await getOrganizations().then(async () => {
                    await getCurrentOrganization().then(async () => {
                        await getProjects().then(async () => {
                            await getOrgMembers();
                        });
                    });
                });
            }
        }
    }
})