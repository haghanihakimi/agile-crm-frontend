import { useOrgsStore } from "~/server/store/organizations";
import { useMemberstore } from "~/server/store/members";
import { usePopupsStore } from "~/server/store/popups";

export default function useOrganizations() {
    interface AcceptInvitationRes {
        token: any;
        expire: any;
    }
    const orgs = useOrgsStore();
    const members = useMemberstore();
    const popups = usePopupsStore();
    const router = useRouter();

    async function getCurrentOrganization() {
        interface Response {
            code: any;
            message: any;
            organization: any;
        }

        if (Object.keys(orgs.currentOrganization).length > 0 || members.orgMembers.length > 0) {
            return;
        }

        const fetchOrganization = async (endpoint: string) => {
            const res = await useApiFetch(endpoint) as Response;

            return res;
        };

        const handleOrganizationResponse = async (res: Response) => {
            const { code, organization } = res;
            switch (code) {
                case 200:
                    orgs.currentOrganization(organization);
                    if ((router.currentRoute.value.params.org &&
                        router.currentRoute.value.params.org !== organization.org_uuid) ||
                        router.currentRoute.value.name === "organization-new-create") {
                        navigateTo(`/board/${organization.org_uuid}`)
                    }
                    break;
                case 404:
                    if (router.currentRoute.value.name !== "organization-new-create") {
                        window.location.href = '/organization/new/create';
                    }
                    break;
                default:
                    break;
            }
        };

        const firstOrganizationRes = await fetchOrganization(`/api/organization/read/${router.currentRoute.value.params.org}`);
        if (firstOrganizationRes.code === 200) {
            handleOrganizationResponse(firstOrganizationRes);
        } else {
            const secondOrganizationRes = await fetchOrganization('/api/active/organization');
            handleOrganizationResponse(secondOrganizationRes);
        }
    }

    async function getOrganizations() {
        try {
            interface Response {
                organizations: any;
            }
            if (orgs.organizations.length > 0) {
                return;
            }
            const res = await useApiFetch('/api/organizations/read');
            const { organizations } = res as Response;

            orgs.getOrganizations(organizations);
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.message);
                    break;
                case 403:
                    alert(error.response._data.message);
                    break;
                case 404:
                    alert(error.response._data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function createOrganization(input: any) {
        try {
            interface Response {
                organization: any;
            }

            orgs.toggleLoading(true);

            const res = await useApiFetch('/api/organization/create', "POST", {
                name: input.name,
                description: input.description
            }).finally(() => {
                orgs.toggleLoading(false);
            }) as Response;

            const { organization } = res;

            orgs.createOrganization(organization);
            popups.toggleOrganizationPopup(false);
            window.location.href = `/board/${organization.org_uuid}`;
        } catch (error: any) {
            switch (error.response.status) {
                case 422:
                    const stringMessages = [];
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    orgs.setMessages(stringMessages);
                    break;
                case 500:
                    orgs.setMessages(error.response._data.message);
                default:
                    orgs.setMessages("OOPS! Sorry, something went wrong with creating new organization. Please try again later.");
                    break;
            }
        }
    }

    async function updateOrganization(id: string, name: string, description: string) {
        try {
            interface Response {
                organization: any;
                message: any;
                code: any;
            }


            if (!orgs.loading) {
                orgs.toggleLoading(true);
                const res = await useApiFetch(`/api/organization/update/${id}`, "PATCH", {
                    name: name,
                    description: description,
                }).finally(() => {
                    orgs.toggleLoading(false);
                }) as Response;

                const { organization, message, code } = res;

                orgs.setMessages(message);
                orgs.setOutputCode(code);
                orgs.updateOrganization(organization);
            }
        } catch (error: any) {
            switch (error.response.status) {
                case 403:
                    orgs.setMessages(error.response._data.message);
                    orgs.setOutputCode(403);
                    break;
                case 404:
                    orgs.setMessages(error.response._data.message);
                    break;
                case 422:
                    const stringMessages = [];
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    orgs.setMessages(stringMessages);
                    orgs.setOutputCode(422);
                    break;
                case 500:
                    orgs.setMessages(error.response._data.message);
                    orgs.setOutputCode(500);
                default:
                    orgs.setOutputCode(500);
                    orgs.setMessages("OOPS! Sorry, something went wrong with creating new organization. Please try again later.");
                    break;
            }
        }
    }

    async function deleteOrganization(id: string) {
        try {
            interface Response {
                organization: any;
                sessions: number,
            }

            if (!orgs.loading) {
                orgs.toggleLoading(true);
                const res = await useApiFetch(`/api/organization/delete/${id}`, "DELETE")
                    .finally(() => {
                        orgs.toggleLoading(false);
                    }) as Response;

                const { organization, sessions } = res;

                orgs.deleteOrganization(organization);
                orgs.setOutputCode(200);

                if (sessions <= 0) {
                    window.location.reload();
                }
            }
        } catch (error: any) {
            switch (error.response.status) {
                case 403:
                    orgs.setMessages(error.response._data.message);
                    orgs.setOutputCode(403);
                    break;
                case 404:
                    orgs.setMessages(error.response._data.message);
                    orgs.setOutputCode(404);
                    break;
                case 500:
                    orgs.setMessages(error.response._data.message);
                    orgs.setOutputCode(500);
                default:
                    orgs.setOutputCode(500);
                    orgs.setMessages("OOPS! Sorry, something went wrong with creating new organization. Please try again later.");
                    break;
            }
        }
    }

    return {
        getCurrentOrganization,
        getOrganizations,
        createOrganization,
        updateOrganization,
        deleteOrganization,
    }
}