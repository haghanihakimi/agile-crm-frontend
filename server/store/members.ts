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
    }),
    actions: {
        getOrgMembers(members: any) {
            this.orgMembers = members

            if (this.orgMembers && this.orgMembers.length > 0) {
                members.map((member: any) => this.projectAssignees.options.push({
                    value: member.email,
                    label: `${member.firstname} ${member.lastname}`,
                }))
            }
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
    },
})