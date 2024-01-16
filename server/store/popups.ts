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
        editProfilePopup: false,
        deleteAccountPopup: false,
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
    },
})