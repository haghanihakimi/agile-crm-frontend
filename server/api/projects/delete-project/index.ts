export default defineEventHandler(async (event) => {
    if (event.method === "DELETE") {
        const cookies = parseCookies(event);
        const body = await readBody(event);
        const deletedProject = await $fetch(`http://127.0.0.1:443/api/project/delete/${body.org}/${body.id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            body: body
        });

        return deletedProject
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})