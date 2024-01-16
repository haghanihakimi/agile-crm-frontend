export default defineNuxtRouteMiddleware(async (to, from) => {
    const response = await $fetch('http://localhost:443/sanctum/csrf-cookie', {
        method: 'GET',
    });
})