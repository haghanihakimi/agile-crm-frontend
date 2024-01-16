export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const data = await readBody(event);
        const createOrganization = await $fetch('http://127.0.0.1:443/api/organization/create', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
            body: {
                name: data.name,
                description: data.description
            }
        });

        return createOrganization
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})