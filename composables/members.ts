import { useMemberstore } from "~/server/store/members";
import { useOrgsStore } from "~/server/store/organizations";

export default function useMembers() {
    const members = useMemberstore();
    const orgs = useOrgsStore();
    const router = useRouter();

    async function getOrgMembers() {
        try {
            interface Response {
                code: any;
                message: any;
                orgMembers: any;
            }
            if (members.orgMembers.length > 0) {
                return;
            }
            members.setLoadingMembers(true);
            const res = await useApiFetch(`/api/read/organization/${orgs.activeOrganization.org_uuid}/members`)
                .finally(() => { members.setLoadingMembers(false) });
            const { code, message, orgMembers } = res as Response;
            members.getOrgMembers(orgMembers);
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function getProjectMembers() {
        try {
            interface Response {
                code: any;
                message: any;
                projectMembers: any;
            }
            if (members.projectMembers.length > 0) {
                return;
            }
            const res = await useApiFetch(`/api/read/project/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/members`);

            const { code, message, projectMembers } = res as Response;
            members.getProjectMembers(projectMembers);
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function getTaskMembers(orgUuid: any, projectUuid: any, taskUuid: any) {
        try {
            interface Response {
                code: any;
                message: any;
                taskMembers: any;
            }
            if (members.taskMembers.length > 0) {
                return;
            }
            const res = await useApiFetch(`/api/read/task/${orgUuid}/${projectUuid}/${taskUuid}/members`);

            const { code, message, taskMembers } = res as Response;

            members.getTaskMembers(res);
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function removeOrgMember(memberId: number, orgId: number) {
        // 
        try {
            interface Response {
                member: any;
                code: any;
                message: any;
            }

            members.toggleRemovingMember(true);

            const res = await useApiFetch(`/api/remove/organization/${orgId}/member/${memberId}`, "DELETE")
                .finally(() => {
                    members.toggleRemovingMember(false);
                }) as Response;

            console.log(res);

            const { code, member, message } = res;

            members.setOutputCode(code);
            members.removeOrgMember(memberId);

        } catch (error: any) {
            switch (error.response.status) {
                case 403:
                    members.setMessages(error.response._data.message);
                    break;
                case 404:
                    members.setMessages(error.response._data.message);
                    break;
                case 500:
                    members.setMessages(error.response._data.message);
                    break;
                default:
                    members.setMessages("OOPS! Sorry, something went wrong with creating new organization. Please try again later.");
                    break;
            }
        }
    }

    return {
        getOrgMembers,
        getProjectMembers,
        getTaskMembers,
        removeOrgMember,    
    }
}