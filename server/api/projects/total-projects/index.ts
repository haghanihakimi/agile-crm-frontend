export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        const cookies = parseCookies(event);
        const query = getQuery(event);
        const projects = await $fetch(`http://127.0.0.1:443/api/project/total/count/${query.org}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            }
        });

        return projects
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})