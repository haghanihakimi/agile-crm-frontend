import { defineStore } from 'pinia'

interface Profile {
    user: {
        id: any;
        firstname: any;
        lastname: any;
        username: any;
        email: any;
        email_verified_at: any;
        phone: any;
        image: any;
        bio: any;
        created_at: any;
    },
    orgs: any;
    projects: any;
    tasks: any;
}

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        auth: false,
        profile: {} as Profile,
        users: [] as Array<any>,
        userProfile: {},
        loadingProfile: false,
        messages: '',
        outputCode: 0,
        savingChanges: false,
        removingProfile: false,
    }),
    actions: {
        setAuth(status: any) {
            this.auth = status;
        },
        getMessage(message: any) {
            this.messages = message;
        },
        setProfile(user: any) {
            this.profile = user;
        },
        saveSettings(user: any) {
            this.profile.user = user;
        },
        setOutputCode(code: any) {
            this.outputCode = code;
        },
        toggleSaveChanges(status: boolean) {
            this.savingChanges = status;
        },
        toggleRemovingProfile(status: boolean) {
            this.removingProfile = status
        },
        toggleLoadingProfile(status: boolean) {
            this.loadingProfile = status
        },
        fetchUsers(user: any) {
            this.users.push(user);
        },
        getUser(id: any) {
            this.userProfile = this.users.find((user) => user.id == id);
        }
    },
})