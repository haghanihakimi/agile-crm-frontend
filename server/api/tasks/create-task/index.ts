export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const newTask = await $fetch(`http://127.0.0.1:443/api/task/create/${data.org}/${data.project}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            body: data
        });

        return newTask
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})