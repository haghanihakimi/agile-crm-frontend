export default defineEventHandler(async (event) => {
    if (event.method === "PATCH") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const update = await $fetch(`http://localhost:443/api/task/update/${data.org}/${data.project}/${data.task}`, {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies['auth']}`,
                'X-CSRF-TOKEN': cookies['XSRF-TOKEN'],
            },
            body: data
        });

        return update
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})