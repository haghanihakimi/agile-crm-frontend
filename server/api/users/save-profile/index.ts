export default defineEventHandler(async (event) => {
    if (event.method === "PATCH") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const saveProfile = await $fetch('http://127.0.0.1:443/api/save/profile/settings', {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies['auth']}`,
                'X-CSRF-TOKEN': cookies['XSRF-TOKEN'],
            },
            body: data
        });

        return saveProfile
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})