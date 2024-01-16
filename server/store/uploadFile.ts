import { defineStore } from 'pinia'

export const useUploadFileStore = defineStore('uploadFile', {
    state: () => ({
        newFiles: [],
    }),
    actions: {
        pushNewFiles(files: any) {
            this.newFiles = files;
        },
        spliceFiles(index: any) {
            this.newFiles.splice(index, 1);
        },
    },
})