export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const acceptInvitation = await $fetch(`http://127.0.0.1:443/api/organization/new/user/invitation/acceptance/${data.email}/${data.signature}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            body: {
                user: data.user,
            }
        });

        return acceptInvitation
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})