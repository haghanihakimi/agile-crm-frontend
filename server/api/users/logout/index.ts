export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const logout = await $fetch('http://127.0.0.1:443/api/signout', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            }
        });

        return logout
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})