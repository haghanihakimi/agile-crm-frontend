import { defineStore } from 'pinia'

interface Organization {
    organizations: Array<any>
}

interface ActiveOrganization {
    id: number;
    org_uuid: string;
    creator_id: number;
    name: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export const useOrgsStore = defineStore('organizations', {
    state: () => ({
        organizations: [] as Organization[],
        activeOrganization: {} as ActiveOrganization,
        loading: false,
        messages: '',
    }),
    actions: {
        currentOrganization(org: any) {
            this.activeOrganization = org
        },
        getOrganizations(orgs: any) {
            this.organizations = orgs;
        },
        createOrganization(newOrg: any) {
            this.organizations.push(newOrg);
        },
        toggleLoading(status: boolean) {
            this.loading = status
        },
        setMessages(message: any) {
            this.messages = message
        },
    },
})