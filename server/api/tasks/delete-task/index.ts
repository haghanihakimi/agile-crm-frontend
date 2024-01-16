export default defineEventHandler(async (event) => {
    if (event.method === "DELETE") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const deleteTask = await $fetch(`http://localhost:443/api/task/delete/${data.org}/${data.project}/${data.task}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies['auth']}`,
                'X-CSRF-TOKEN': cookies['XSRF-TOKEN'],
            },
            body: data
        });

        return deleteTask
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})