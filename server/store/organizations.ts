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
        outputCode: 0,
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
        updateOrganization(organization: ActiveOrganization){
            const org = this.organizations.find((org: any) => org.org_uuid === organization.org_uuid);
            if (org) {
                org.name = organization.name;
                org.description = organization.description;
            }
        },
        deleteOrganization(organization: ActiveOrganization){
            const index = this.organizations.findIndex((org: any) => org.org_uuid === organization.org_uuid);
            if (index > -1) {
                this.organizations.splice(index, 1);
            }
        },
        setOutputCode(code: any) {
            this.outputCode = code;
        },
        setMessages(message: any) {
            this.messages = message
        },
    },
})