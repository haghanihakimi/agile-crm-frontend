import { useMemberstore } from "~/server/store/members";
import { useOrgsStore } from "~/server/store/organizations";

export default function useInvitations() {
    const members = useMemberstore();
    const orgs = useOrgsStore();

    async function invitation(users: any) {
        try {
            const res = await useApiFetch(`/api/organization/invitation`, "POST", {
                users: users
            });
        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 422:
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    orgs.setMessages(stringMessages);
                    break;
                case 500:
                    orgs.setMessages(error.response._data.data.message);
                    break;
                default:
                    orgs.setMessages("OOPS! Sorry, something went wrong with sending invitation link. Please try again later.");
                    break;
            }
        }
    }

    async function getInvitations() {
        interface Response {
            code: number;
            invitations: Array<any>;
        }
        try {
            const res = await useApiFetch('/api/members/fetch/invitations');

            const { code, invitations } = res as Response;

            if (code === 200) {
                members.getPendingInvitations(invitations);
                members.setOutputCode(code);
            }
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 403:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 404:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 422:
                    const stringMessages = [];
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    members.setMessages(stringMessages);
                    members.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
        }
    }

    async function acceptInvitation(invitation: any) {
        interface Response {
            code: number;
            organization: object;
        }
        try {
            const res = await useApiFetch(`/api/invitation/acceptance/${invitation}`, "POST");

            const { code, organization } = res as Response;

            if (code === 200) {
                members.slicePendingInvitation(invitation);
                members.setOutputCode(code);
                orgs.createOrganization(organization);
            }
        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 500:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 403:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 404:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    members.setMessages(stringMessages);
                    members.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
        }
    }

    async function rejectInvitation(invitation: any) {
        interface Response {
            code: number;
        }
        try {
            const res = await useApiFetch(`/api/invitation/reject/${invitation}`, "DELETE");

            const { code } = res as Response;

            members.slicePendingInvitation(invitation);
            members.setOutputCode(code);
        } catch (error: any) {
            const stringMessages = [];
            
            switch (error.response.status) {
                case 500:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 403:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 404:
                    members.setMessages(error.response._data.data.message);
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    members.setMessages(stringMessages);
                    members.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
        }
    }

    return {
        invitation,
        getInvitations,
        acceptInvitation,
        rejectInvitation,
    }
}