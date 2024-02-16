export default defineNuxtRouteMiddleware(async (to, from) => {
    const router = useRouter();

    const res = await useApiFetch(`/api/verify/password/reset/${router.currentRoute.value.params.username}`, 'GET', {
        signature: router.currentRoute.value.query.signature
    })

    if (!res) {
        return navigateTo('/login')
    }
})