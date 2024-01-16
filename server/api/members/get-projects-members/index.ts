export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        const cookies = parseCookies(event);
        const query = getQuery(event);
        const members = await $fetch(`http://127.0.0.1:443/api/read/project/${query.org}/${query.project}/members`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            }
        });

        return members
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})