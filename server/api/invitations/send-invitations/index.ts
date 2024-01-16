export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const sendInvitation = await $fetch('http://127.0.0.1:443/api/members/invitations', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            body: {
                inviteTo: data.inviteTo,
                users: data.users
            }
        });

        return sendInvitation
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})