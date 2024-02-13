import { useOrgsStore } from "~/server/store/organizations";
import { useProfilesStore } from "~/server/store/profiles";


export default function useUsers() {
    interface User {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        email_verified_at: string;
        phone: string;
        image: string;
        bio: string;
        created_at: string;
    }
    const profiles = useProfilesStore();
    const orgs = useOrgsStore();

    async function signUp(user: any) {
        interface Response {
            token: string;
            expire: number;
            message: string;
            code: number;
        }

        try {
            const res = await useApiFetch('/api/user/create/account', "POST", user);
            const { token, expire, message, code } = res as Response;

            const cookie = useCookie('auth', { maxAge: expire, secure: true });
            cookie.value = token;

            profiles.getMessage(message);
            profiles.setOutputCode(code);
            window.location.reload();

        } catch (error: any) {
            const stringMessages = [];
            switch (error.response.status) {
                case 500:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 403:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 404:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    profiles.getMessage(stringMessages);
                    profiles.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
        }
    }

    async function sginIn(user: any) {
        interface SignInRes {
            token: string;
            expire: number;
            message: string;
        }

        try {
            const res = await useApiFetch('/api/signin', "POST", user);

            const { token, expire, message } = res as SignInRes;
            const cookie = useCookie('auth', { maxAge: expire, secure: true });
            cookie.value = token;

            profiles.getMessage(message);

            await navigateTo('/dashboard/undefined');

        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 500:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 403:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 404:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    profiles.getMessage(stringMessages);
                    profiles.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
        }
    }

    async function signOut() {
        try {
            const cookies = useCookie('auth');
            const res = await useApiFetch('/api/signout', "POST");

            cookies.value = null;
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.message);
                    break;
                default:
                    alert(error.response._data.message);
                    break;
            }
        }
    }

    async function saveProfile() {
        interface Response {
            user: User;
            message: string;
        }
        try {
            profiles.toggleSaveChanges(true);

            const res = await useApiFetch('/api/save/profile/settings', "PATCH", profiles.profile)
                .finally(() => {
                    profiles.toggleSaveChanges(false);
                });

            const { message, user } = res as Response;

            profiles.saveSettings(user);
            profiles.getMessage(message);
            profiles.setOutputCode(200);

        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 401:
                    profiles.getMessage("Unauthorized access!");
                    profiles.setOutputCode(error.response.status);
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    profiles.getMessage(stringMessages);
                    profiles.setOutputCode(error.response.status);
                    break;
                case 500:
                    profiles.getMessage(error.response._data.message);
                    profiles.setOutputCode(error.response.status);
                    break;
                case 403:
                    profiles.getMessage(error.response._data.message);
                    profiles.setOutputCode(error.response.status);
                    break;
                case 404:
                    profiles.getMessage(error.response._data.message);
                    profiles.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
            return Promise.resolve(error);
        }
    }

    async function updateProfileImage(image: any) {
        interface Response {
            user: User;
            code: number;
        }

        try {
            profiles.toggleSaveChanges(true);
            let formData = new FormData();
            formData.append('newImage', image[0])

            const res = await useApiFetch('/api/change/profile/picture', "POST", formData)
                .finally(() => {
                    profiles.toggleSaveChanges(false);
                });

            const { user, code } = res as Response;

            profiles.saveSettings(user);

            profiles.setOutputCode(code);

        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 401:
                    profiles.getMessage("Unauthorized access!");
                    profiles.setOutputCode(error.response.status);
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    profiles.getMessage(stringMessages);
                    profiles.setOutputCode(error.response.status);
                    break;
                case 500:
                    profiles.getMessage(error.response._data.message);
                    profiles.setOutputCode(error.response.status);
                    break;
                case 403:
                    profiles.getMessage(error.response._data.message);
                    profiles.setOutputCode(error.response.status);
                    break;
                case 404:
                    profiles.getMessage(error.response._data.message);
                    profiles.setOutputCode(error.response.status);
                    break;
                default:
                    break;
            }
            return Promise.resolve(error);
        }
    }

    async function removeProfile() {
        try {
            profiles.toggleRemovingProfile(true);

            const res = await useApiFetch('/api/delete/user/account', "DELETE")
                .finally(() => {
                    profiles.toggleRemovingProfile(false);
                });

            const cookie = useCookie('auth');
            cookie.value = null;
            navigateTo('/');

            window.location.reload();

        } catch (error: any) {
            switch (error.response.status) {
                case 401:
                    profiles.getMessage("Unauthorized access!");
                    profiles.setOutputCode(error.response.status);
                    break;
                case 500:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 403:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 404:
                    profiles.getMessage(error.response._data.message);
                    break;
                default:
                    profiles.getMessage(error.response._data.message);
                    break;
            }
        }
    }

    async function fetchUsers(userId: any) {
        try {
            interface Response {
                user: any;
            }
            const existingUser = profiles.users.find(user => user.id === userId);
            if (existingUser) {
                return; // Return the existing user
            }

            profiles.toggleLoadingProfile(true);

            const res = await useApiFetch(`/api/fetch/profile/user/${userId}`)
                .finally(() => {
                    profiles.toggleLoadingProfile(false);
                });

            const { user } = res as Response;

            profiles.fetchUsers(user);

        } catch (error: any) {
            switch (error.response.status) {
                case 401:
                    profiles.getMessage("Unauthorized access!");
                    profiles.setOutputCode(error.response.status);
                    break;
                case 500:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 403:
                    profiles.getMessage(error.response._data.message);
                    break;
                case 404:
                    profiles.getMessage(error.response._data.message);
                    break;
                default:
                    break;
            }
            return Promise.resolve(error);
        }
    }

    return {
        signUp,
        sginIn,
        signOut,
        saveProfile,
        updateProfileImage,
        removeProfile,
        fetchUsers,
    }
}