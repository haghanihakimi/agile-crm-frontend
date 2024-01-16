import { defineStore } from 'pinia'

export const useTimeframesStore = defineStore('timeframes', {
    state: () => ({
        startDate: new Date(),
        endDate: new Date(),
    }),
    actions: {
        setStartDate(date: any) {
            this.startDate = date
        },
        setEndDate(date: any) {
            this.endDate = date
        },
    },
})