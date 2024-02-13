import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => ({
        results: [],
        searching: false,
    }),
    actions: {
        getResults(result: any) {
            this.results = result;
        },
        toggleSearching(status: boolean) {
            this.searching = status;
        },
    },
})