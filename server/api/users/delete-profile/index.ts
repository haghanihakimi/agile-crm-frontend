export default defineEventHandler(async (event: any) => {
    if (event.method === "DELETE") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const deleteProfile = await $fetch('http://127.0.0.1:443/api/delete/user/account', {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies['auth']}`,
                'X-CSRF-TOKEN': cookies['XSRF-TOKEN'],
            },
        });

        return deleteProfile
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})