import { defineStore } from 'pinia'

interface Permissions {
    createTask?: boolean;
    createProject?: boolean;
    createOrg?: boolean;
    editProject?: boolean;
    editOrg?: boolean;
    editTask?: boolean;
}

export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        canCreateTask: false,
        canCreateProject: false,
        canCreateOrg: false,
        canEditProject: false,
        canEditOrg: false,
        canEditTask: false,
    }),
    actions: {
        setPermissions(val: any) {
            this.canCreateTask = val?.canCreateTask ?? this.canCreateTask;
            this.canCreateProject = val?.canCreateProject ?? this.canCreateProject;
            this.canCreateOrg = val?.canCreateOrg ?? this.canCreateOrg;
            this.canEditProject = val?.editProject ?? this.canEditProject;
            this.canEditOrg = val?.editOrg ?? this.canEditOrg;
            this.canEditTask = val?.editTask ?? this.canEditTask;
        },
    },
})