import axios from "axios";

export default defineEventHandler(async (event) => {
    if (event.method === "POST") {
        const cookies = parseCookies(event);
        const body = await readBody(event);
        const data = await $fetch(`http://127.0.0.1:443/api/organization/switch/${body.orgUuid}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies?.auth}`,
            },
        });

        return data
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed!',
        })
    }
})