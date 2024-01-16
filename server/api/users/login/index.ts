export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const data = await readBody(event);
        const signin = await $fetch('http://127.0.0.1:443/api/signin', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: data
        });

        return signin
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})