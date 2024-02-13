import { useOrgsStore } from "~/server/store/organizations";
import { useSearchStore } from "~/server/store/search";


export default function useSearch() {
    const orgs = useOrgsStore();
    const seraches = useSearchStore();

    async function search(input: string) {
        try {
            interface Response {
                results: Array<any>;
            }

            if (!seraches.searching) {
                seraches.toggleSearching(true);

                const res = await useApiFetch(`/api/search/${orgs.activeOrganization.org_uuid}`,
                    "GET", {
                    query: input,
                }).finally(() => {
                    seraches.toggleSearching(false);
                });

                const { results } = res as Response;

                seraches.getResults(results);
            }
        } catch (error: any) {
            // switch (error.response.status) {
            //     case 404:
            //         tasks.setMessages(error.response._data.message);
            //         popups.toggleDeleteCommentPopup(false, '');
            //         break;
            //     case 500:
            //         tasks.setMessages(error.response._data.message);
            //         popups.toggleDeleteCommentPopup(false, '');
            //         break;
            //     case 403:
            //         tasks.setMessages(error.response._data.message);
            //         popups.toggleDeleteCommentPopup(false, '');
            //         break;
            //     default:
            //         tasks.setMessages(error.response._data.message);
            //         popups.toggleDeleteCommentPopup(false, '');
            //         break;
            // }
        }
    }

    return {
        search,
    }
}