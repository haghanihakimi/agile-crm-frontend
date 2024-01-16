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
            const res = await $fetch(endpoint, {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                },
            }) as Response;

            return res;
        };

        const handleOrganizationResponse = async (res: Response) => {
            const { code, organization } = await res;
            switch (code) {
                case 200:
                    orgs.currentOrganization(organization);
                    if (router.currentRoute.value.params.org &&
                        router.currentRoute.value.params.org !== organization.org_uuid) {
                        navigateTo(`/board/${organization.org_uuid}`)
                    }
                    break;
                case 404:
                    window.location.href = '/organization/new/create';
                    // Redirect users to "create organization & project" page instead!
                    break;
                default:
                    break;
            }
        };

        const firstOrganizationRes = await fetchOrganization('/api/organizations/current-organization');
        if (firstOrganizationRes.code === 200) {
            handleOrganizationResponse(firstOrganizationRes);
        } else {
            const secondOrganizationRes = await fetchOrganization('/api/organizations/first-organization');
            handleOrganizationResponse(secondOrganizationRes);
        }
    }

    async function getOrganizations() {
        interface Response {
            code: any;
            message: any;
            organizations: any;
        }
        if (orgs.organizations.length <= 0) {
            const res = await $fetch('/api/organizations/all-organizations');
            const { code, message, organizations } = res as Response;

            orgs.getOrganizations(organizations);
        }
    }

    async function createOrganization(input: any) {
        interface Response {
            code: any;
            message: any;
            organization: any;
        }

        orgs.toggleLoading(true);

        const res = await $fetch('/api/organizations/create-organization', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                name: input.name,
                description: input.description
            }
        }).finally(() => {
            orgs.toggleLoading(false);
        }) as Response;

        const { code, message, organization } = res;

        switch (code) {
            case 200:
                orgs.createOrganization(organization);
                popups.toggleOrganizationPopup(false);
                window.location.href = `/board/${organization.org_uuid}`;
                break;
            case 422:
                const stringMessages = [];
                for (const messagesArray of Object.values(message)) {
                    if (Array.isArray(messagesArray)) {
                        stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                    }
                }
                orgs.setMessages(stringMessages);
                break;
            default:
                break;
        }
    }

    async function inviteOrgMembers(users: any) {
        const res = await $fetch('/api/organizations/invite-organization', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                users: users
            }
        });
        console.log(res);
    }

    async function acceptInvitation(data: any, email: any, signature: any) {
        const res = await $fetch('/api/organizations/accept-invitation', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                user: data,
                email: email,
                signature: signature
            }
        });

        if (res) {
            const { token, expire } = res as AcceptInvitationRes;
            const cookie = useCookie('auth', { maxAge: expire, secure: true });
            cookie.value = token;
            return await navigateTo('/');
        }
    }

    return {
        getCurrentOrganization,
        getOrganizations,
        createOrganization,
        inviteOrgMembers,
        acceptInvitation,
    }
}