export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        const cookies = parseCookies(event);
        const query = getQuery(event);
        const tasks = await $fetch(`http://localhost:443/api/tasks/read/tasks/${query.org}/${query.project}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            withXSRFToken: true,
            withCredentials: true
        });

        return tasks
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})