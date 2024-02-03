export default defineNuxtRouteMiddleware(async (to, from) => {
    const response = await useApiFetch(`/sanctum/csrf-cookie`); 
})