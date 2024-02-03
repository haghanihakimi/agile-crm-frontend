import { useProfilesStore } from "~/server/store/profiles";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const profiles = useProfilesStore();
    
    const auth = await useApiFetch('/api/auth/check');
    profiles.setAuth(auth ? true : false);
    // console.log(auth ? true : false);
    if (!auth) {
        return navigateTo('/')
    } else {
        profiles.setProfile(auth);
    }
})