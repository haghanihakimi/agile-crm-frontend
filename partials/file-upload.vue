<script setup>
import { ref } from 'vue';
import { useTasksStore } from '~/server/store/tasks';
import { useUploadFileStore } from '~/server/store/uploadFile';
import { Vue3Lottie } from 'vue3-lottie';
import uploadingAnim from '~/assets/images/uploading.json';

const props = defineProps({
    uploadedFiles: {
        type: Array,
        default: [],
    },
    uploadingFilesDone: {
        type: Boolean,
        default: false,
    }
});
const selectedFiles = ref([]);
const allowedFileTypes = ref([
    'mp4',
    'mp3',
    'wmv',
    'pdf',
    'txt',
    'rtf',
    'doc',
    'docx',
    'pptx',
    'accdb',
    'xlsx',
    'xml',
    'html',
    'py',
    'zip',
    'rar',
]);
const maxFileSizeMB = 50;
const tasks = useTasksStore();
const uploadFiles = useUploadFileStore();

const handleFileChange = async (event) => {
    const input = event.target;

    if (input.files && input.files.length > 0) {
        uploadFiles.pushNewFiles(input.files);
        selectedFiles.value = Array.from(input.files).map((file) => {
            const format = getFileFormat(file.name);

            if (!isValidFileType(format)) {
                // Handle invalid file type
                alert(`Invalid file: ${file.name}`);
                return null;
            }
            if (!isValidFileSize(file.size)) {
                // Handle invalid file size
                alert('Selected files cannot be larger than 50MB');
                return null;
            }

            return {
                name: file.name,
                size: formatFileSize(file.size),
                format,
            };
        });

        // Remove null entries
        selectedFiles.value = selectedFiles.value.filter((file) => file !== null);
    } else {
        selectedFiles.value = [];
    }
};

const isValidFileType = (format) => allowedFileTypes.value.includes(format);

const isValidFileSize = (size) => size <= maxFileSizeMB * 1024 * 1024;

const getFileFormat = (filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : 'Unknown';
};

const formatFileSize = (sizeInBytes) => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (sizeInBytes < kilobyte) {
        return `${sizeInBytes} B`;
    } else if (sizeInBytes < megabyte) {
        return `${(sizeInBytes / kilobyte).toFixed(0)} KB`;
    } else {
        return `${(sizeInBytes / megabyte).toFixed(0)} MB`;
    }
};

watch(() => props.uploadingFilesDone, (newValue) => {
    if (newValue) {
        selectedFiles.value = [];
    }
});

</script>

<template>
    <div class="w-full flex flex-col gap-1">
        <label for="attachments" class="text-base font-medium text-gray-400">
            Attachments
        </label>
        <label for="attachments"
            class="w-full min-h-[80px] rounded border-2 border-dashed border-gray-700 cursor-pointer flex justify-center items-center">
            <input type="file" name="newFiles[]" @change="handleFileChange" multiple id="attachments"
                class="invisible hidden opacity-0"
                accept=".pdf, .doc, .docx, .txt, .ppt, .accdb, .xls, .xlsx, .xml, .html, .py, .zip, .rar, video/mp4, audio/mp3, audio/wmv" />
            <Icon name="ic:baseline-cloud-upload" class="text-4xl text-gray-400" />
        </label>
        <Vue3Lottie :animationData="uploadingAnim" :height="120" :width="120" :speed="2" v-if="tasks.uploadingFiles" />

        <!-- Already uploaded files goes here -->
        <div class="w-full relative gap-2 flex flex-row flex-wrap mt-2" v-if="tasks.selectedTask.files.length > 0">
            <div v-for="(file, index) in tasks.selectedTask.files" :key="index"
                class="w-fit h-auto px-2 rounded-2xl bg-slate-harbor relative flex justify-center items-center gap-1">
                <NuxtLink :to="`http://localhost:443/storage/${file.file_path}`" target="_blank" class="py-1">
                    <span class="text-gray-200">
                        {{ file.original_name }}
                    </span>
                </NuxtLink>
                <a-button type="ghost" @click="() => tasks.selectedTask.files.splice(index, 1)"
                    class="w-5 h-5 rounded-full m-0 p-0 flex justify-center items-center">
                    <Icon name="heroicons:x-mark-20-solid" class="text-xl font-bold text-gray-200" />
                </a-button>
            </div>
        </div>

        <div class="w-full relative gap-2 flex flex-row flex-wrap mt-2" v-if="selectedFiles.length > 0">
            <div v-for="(file, index) in selectedFiles" :key="index"
                class="w-fit h-auto px-2 py-1 rounded-2xl bg-slate-harbor relative flex justify-center items-center gap-1">
                <span class="text-gray-200">
                    {{ file.name }} ({{ file.size }})
                </span>
                <a-button type="ghost" @click="selectedFiles.splice(index, 1); uploadFiles.spliceFiles(index)"
                    class="w-5 h-5 rounded-full m-0 p-0 flex justify-center items-center">
                    <Icon name="heroicons:x-mark-20-solid" class="text-xl font-bold text-gray-200" />
                </a-button>
            </div>
        </div>
    </div>
</template>