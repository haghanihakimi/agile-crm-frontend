import { useProfilesStore } from "~/server/store/profiles";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const profiles = useProfilesStore();
    
    const auth = await useApiFetch('/api/auth/check');
    profiles.setAuth(auth ? true : false);
    if (!auth) {
        const token = useCookie('auth');
        token.value = null;
        return navigateTo('/login')
    } else {
        profiles.setProfile(auth);
    }
})