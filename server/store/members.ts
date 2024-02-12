import { defineStore } from 'pinia'

interface Members {
    id: any;
    firstname: any;
    lastname: any;
    username: any;
    email: any;
    email_verified_at: any;
    image: any;
    created_at: any;
    updated_at: any;
}

interface Assignees {
    value: any;
    label: any;
}

export const useMemberstore = defineStore('members', {
    state: () => ({
        taskMembers: [] as Members[],
        projectMembers: [] as Members[],
        orgMembers: [] as Members[],
        projectAssignees: {
            mode: 'tags',
            value: [],
            closeOnSelect: false,
            options: [] as Assignees[],
            placeholder: 'Assign task to...',
            searchable: true,
            createOption: true
        },
        inviteTo: 'Organization',
        loadingMembers: false,
        removingMember: false,
        pendingInvitations: [] as Array<any>,
        messages: '',
        outputCode: 0,
    }),
    actions: {
        getOrgMembers(members: any) {
            this.orgMembers = members
        },
        getTaskMembers(val: any) {
            this.taskMembers = val?.members;
        },
        getProjectMembers(val: any) {
            this.projectAssignees.options = [];
            this.projectMembers = val;
        },
        setInviteType(val: any) {
            this.inviteTo = val;
        },
        setLoadingMembers(status: boolean) {
            this.loadingMembers = status
        },
        getPendingInvitations(invitations: any) {
            this.pendingInvitations = invitations
        },
        slicePendingInvitation(id: number) {
            const index = this.pendingInvitations.findIndex((invitation) => invitation.id === id);
            
            if (index > -1) {
                this.pendingInvitations.splice(index, 1);
            }
        },
        setOutputCode(code: any) {
            this.outputCode = code;
        },
        setMessages(message: any) {
            this.messages = message;
        },
        toggleRemovingMember(status: boolean) {
            this.removingMember = status
        },
        removeOrgMember(memberId: number) {
            const index = this.orgMembers.findIndex((member: any) => member.user_id === memberId);
            if (index > -1) {
                this.orgMembers.splice(index, 1);
            }
        },
    },
})