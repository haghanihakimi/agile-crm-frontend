export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        const cookies = parseCookies(event);
        const query = getQuery(event);
        const project = await $fetch(`http://127.0.0.1:443/api/project/active/project/${query.org}/${query.project}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            }
        });

        return project
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})