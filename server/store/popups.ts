import { defineStore } from 'pinia'

export const usePopupsStore = defineStore('popups', {
    state: () => ({
        memberInvitation: false,
        newTaskPopup: false,
        priorityOptionsVis: false,
        taskStatusVis: false,
        editTaskPopup: false,
        newProjectVis: false,
        newOrganizationVis: false,
        editProjectPopup: false,
        deleteProjectPopup: false,
        deleteTaskPopup: false,
        deleteCommentPopup: {
            status: false,
            comment: '',
        },
        orgUpdatePopup: {
            name: '',
            description: '',
            id: '',
            status: false,
        },
        orgDeletePopup: {
            id: '',
            status: false,
        },
        editProfilePopup: false,
        deleteAccountPopup: false,
        userProfilePopup: {
            id: 0,
            status: false,
        },
        removeOrgMemberPopup: {
            id: 0,
            org_id: 0,
            firstname: '',
            surname: '',
            status: false,
        }
    }),
    actions: {
        toggleMemberInvitation(status: boolean) {
            this.memberInvitation = status
        },
        toggleNewTaskPopup(status: boolean) {
            this.newTaskPopup = status
        },
        togglePriorityOptions(status: boolean) {
            this.priorityOptionsVis = status
        },
        toggleTaskStatus(status: boolean) {
            this.taskStatusVis = status
        },
        toggleEditTaskPopup(status: boolean) {
            this.editTaskPopup = status;
        },
        toggleNewProjectPopup(status: boolean) {
            this.newProjectVis = status
        },
        toggleOrganizationPopup(status: boolean) {
            this.newOrganizationVis = status
        },
        toggleEditProjectPopup(status: boolean) {
            this.editProjectPopup = status;
        },
        toggleDeleteProjectPopup(status: boolean) {
            this.deleteProjectPopup = status
        },
        toggleDeleteTaskPopup(status: boolean) {
            this.deleteTaskPopup = status;
        },
        toggleDeleteCommentPopup(status: boolean, comment: string) {
            this.deleteCommentPopup.status = status;
            this.deleteCommentPopup.comment = comment
        },
        toggleEditProfilePopup(status: boolean) {
            this.editProfilePopup = status
        },
        toggleDeleteAccountPopup(status: boolean) {
            this.deleteAccountPopup = status;
        },
        toggleUserProfile(id: number, status: boolean) {
            this.userProfilePopup.id = id;
            this.userProfilePopup.status = status;
        },
        toggleOrgUpdatePopup(id: string, name: string, description: string, status: boolean) {
            this.orgUpdatePopup.id = id;
            this.orgUpdatePopup.name = name;
            this.orgUpdatePopup.description = description;
            this.orgUpdatePopup.status = status;
        },
        toggleOrgDeletePopup(id: string, status: boolean) {
            this.orgDeletePopup.id = id;
            this.orgDeletePopup.status = status;
        },
        toggleRemoveOrgMemberPopup(id: number, org_id: number, firstname: string, surname: string, status: boolean) {
            this.removeOrgMemberPopup.id = id;
            this.removeOrgMemberPopup.org_id = org_id;
            this.removeOrgMemberPopup.firstname = firstname;
            this.removeOrgMemberPopup.surname = surname;
            this.removeOrgMemberPopup.status = status;
        },
    },
})