import type { UseFetchOptions } from "nuxt/app";

export async function useApiFetch<T>(path: string, methods: any = "GET", params: any = {}, options: UseFetchOptions<T> = {}) {
    let headers: any = {};
    const token = useCookie('XSRF-TOKEN');
    const auth = useCookie('auth');
    const config = useRuntimeConfig();

    headers['Accept'] = "application/json" as string;

    if (auth.value) {
        headers['Authorization'] = `Bearer ${auth.value}` as string;
    }

    if (token.value) {
        headers['X-XSRF-TOKEN'] = token.value as string;
    }

    if (process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(["referer", "cookie"]),
        };
    }

    if (methods === "GET") {
        return await $fetch(`${config.public.backendDomain}${path}`, {
            method: methods,
            credentials: "include",
            watch: true,
            headers: {
                ...headers,
                ...options?.headers
            },
            params: {
                ...params
            }
        });
    }
    return await $fetch(`${config.public.backendDomain}${path}`, {
        method: methods,
        credentials: "include",
        watch: true,
        headers: {
            ...headers,
            ...options?.headers
        },
        body: params
    });
}