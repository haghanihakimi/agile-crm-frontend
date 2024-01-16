import { useProfilesStore } from "~/server/store/profiles";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookies = useCookie('auth');
    const profiles = useProfilesStore();
    
    const auth = await $fetch('http://127.0.0.1:443/api/auth/check', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies.value}`,
        },
    });
    profiles.setAuth(auth ? true : false);
    // console.log(auth ? true : false);
    if (!auth) {
        return navigateTo('/')
    } else {
        profiles.setProfile(auth);
    }
})