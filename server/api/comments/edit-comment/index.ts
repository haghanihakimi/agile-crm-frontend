export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const saveComment = await $fetch(`http://127.0.0.1:443/api/comment/task/save/comment/${data.org}/${data.project}/${data.task}/${data.commentId}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            body: data
        });

        return saveComment
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})