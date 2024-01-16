import { useOrgsStore } from "~/server/store/organizations";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookies = useCookie('auth');
    const orgs = useOrgsStore();
    const auth = await $fetch('http://127.0.0.1:443/api/auth/check', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies.value}`,
        },
    });
    if (auth) {
        return navigateTo(`/board/${orgs.activeOrganization.org_uuid}`)
    }
})