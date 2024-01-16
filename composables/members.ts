import { useMemberstore } from "~/server/store/members";

export default function useMembers() {
    const members = useMemberstore();
    const router = useRouter();

    async function getOrgMembers() {
        interface Response {
            code: any;
            message: any;
            orgMembers: any;
        }
        if (members.orgMembers.length <= 0) {
            members.setLoadingMembers(true);
            const res = await $fetch('/api/members/get-orgs-members', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                }
            }).finally(() => {
                members.setLoadingMembers(false)
            });
            const { code, message, orgMembers } = res as Response;
            if (code === 200) {
                members.getOrgMembers(orgMembers);
            }
        }
    }

    async function getProjectMembers() {
        interface Response {
            code: any;
            message: any;
            projectMembers: any;
        }
        if (members.projectMembers.length <= 0) {
            const res = await $fetch('/api/members/get-projects-members', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                    project: router.currentRoute.value.params.project
                }
            });

            const { code, message, projectMembers } = res as Response;
            members.getProjectMembers(projectMembers);
        }
    }

    async function getTaskMembers(orgUuid: any, projectUuid: any, taskUuid: any) {
        interface Response {
            code: any;
            message: any;
            taskMembers: any;
        }
        if (members.taskMembers.length <= 0) {
            const res = await $fetch('/api/members/get-projects-members', {
                method: "GET",
                params: {
                    org: orgUuid,
                    project: projectUuid,
                    task: taskUuid,
                }
            });

            const { code, message, taskMembers } = res as Response;

            members.getTaskMembers(res);
        }
    }

    return {
        getOrgMembers,
        getProjectMembers,
        getTaskMembers,
    }
}