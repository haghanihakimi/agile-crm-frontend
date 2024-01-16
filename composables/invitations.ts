
export default function useInvitations() {
    interface InviteRes {
        error: string;
        message: string;
        existingUsers: any;
    }

    async function invitation(inviteTo: any, users: any) {
        const res = await $fetch('/api/invitations/send-invitations', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                inviteTo: inviteTo,
                users: users
            }
        });
        
        const { error, message, existingUsers } = res as InviteRes;
    }

    return {
        invitation,
    }
}