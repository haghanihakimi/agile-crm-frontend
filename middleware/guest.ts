import { useOrgsStore } from "~/server/store/organizations";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const orgs = useOrgsStore();
    const auth = await useApiFetch('/api/auth/check');
    if (auth) {
        return navigateTo(`/board/${orgs.activeOrganization.org_uuid}`)
    }
})