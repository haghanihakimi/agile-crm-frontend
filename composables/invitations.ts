import { useMemberstore } from "~/server/store/members";
import { useOrgsStore } from "~/server/store/organizations";

export default function useInvitations() {
    const members = useMemberstore();
    const orgs = useOrgsStore();

    async function invitation(users: any) {
        try {
            interface Response {
                code: any;
                message: any;
                existing_users: any;
            }

            const res = await useApiFetch(`/api/organization/invitation`, "POST", {
                users: users
            });
            console.log(res);

            const { code, message, existing_users } = res as Response;
        } catch (error: any) {
            switch (error.response.status) {
                case 422:
                    const stringMessages = [];
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    orgs.setMessages(stringMessages);
                    break;
                case 500:
                    orgs.setMessages(error.response._data.data.message);
                default:
                    orgs.setMessages("OOPS! Sorry, something went wrong with sending invitation link. Please try again later.");
                    break;
            }
        }
    }

    async function getInvitations() {
        interface Response {
            code: any;
            message: any;
            invitations: any;
        }
        try {
            const res = await useApiFetch('/api/members/fetch/invitations');

            const { code, message, invitations } = res as Response;

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
            code: any;
            message: any;
            organization: any;
        }
        try {
            const res = await useApiFetch(`/api/invitation/acceptance/${invitation}`, "POST");

            const { code, message, organization } = res as Response;

            if (code === 200) {
                members.slicePendingInvitation(invitation);
                members.setOutputCode(code);
                orgs.createOrganization(organization);
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

    async function rejectInvitation(invitation: any) {
        interface Response {
            code: any;
            message: any;
        }
        try {
            const res = await useApiFetch(`/api/invitation/reject/${invitation}`, "DELETE");

            const { code, message } = res as Response;

            members.slicePendingInvitation(invitation);
            members.setOutputCode(code);
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

    return {
        invitation,
        getInvitations,
        acceptInvitation,
        rejectInvitation,
    }
}