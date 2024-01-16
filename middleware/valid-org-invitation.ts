export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookies = useCookie('auth');
    const validToken = await $fetch(`http://127.0.0.1:443/api/organization/new/user/invitation/${from.params.email}/${from.params.signature}/check`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies.value}`,
        },
    });
    if (!validToken) {
        return navigateTo('/')
    }
})