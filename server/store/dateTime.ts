import { defineStore } from 'pinia'

export const useDateTimeStore = defineStore('dateTime', {
    state: () => ({
        dateTime: new Date(),
    }),
    actions: {
        setDateTime(dateTime: any) {
            this.dateTime = dateTime
        },
    },
})