export default defineNuxtRouteMiddleware(async (to, from) => {
    const validToken = await useApiFetch(`/api/invitation/validation/${from.params.email}/${from.params.signature}`);
    if (!validToken) {
        return navigateTo('/login')
    }
})