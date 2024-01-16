export default defineEventHandler(async (event) => {
    if (event.method === "DELETE") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const delComment = await $fetch(`http://127.0.0.1:443/api/comment/task/delete/${data.org}/${data.project}/${data.task}/${data.comment}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            withXSRFToken: true,
            withCredentials: true,
            body: data
        });

        return delComment
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})