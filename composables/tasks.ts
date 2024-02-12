import { useTasksStore } from "~/server/store/tasks";
import { useMemberstore } from "~/server/store/members";
import { useDateTimeStore } from '~/server/store/dateTime';
import { usePopupsStore } from "~/server/store/popups";
import { useUploadFileStore } from "~/server/store/uploadFile";

export default function useTasks() {
    const tasks = useTasksStore();
    const router = useRouter();
    const dateTime = useDateTimeStore();
    const popups = usePopupsStore();
    const uploadFile = useUploadFileStore();

    async function getTasks() {
        try {
            interface Response {
                code: any;
                message: any;
                todoTasks: any;
            }
            if (router.currentRoute.value.params.org === undefined || router.currentRoute.value.params.project === undefined || tasks.todoTasks.length > 0) {
                return;
            }
            tasks.toggleLoadingTodoTasks(true);
            const res = await useApiFetch(`/api/tasks/read/tasks/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}`)
                .finally(() => {
                    tasks.toggleLoadingTodoTasks(false);
                });

            const { code, message, todoTasks } = res as Response;

            tasks.getTodoTasks(todoTasks);
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function getTotalTasks() {
        try {
            interface Response {
                code: any;
                message: any;
                totalTasks: any;
            }
            if (tasks.totalTasks > 0) {
                return;
            }
            const res = await useApiFetch(`/api/tasks/count/tasks/${router.currentRoute.value.params.org}`);

            const { code, message, totalTasks } = res as Response;

            if (code === 200) {
                tasks.getTotalTasks(totalTasks);
            }
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function getCompletedTasks() {
        try {
            interface Response {
                code: any;
                message: any;
                completedTasks: any;
            }
            if (tasks.completedTasks > 0) {
                return;
            }
            const res = await useApiFetch(`/api/completed/tasks/${router.currentRoute.value.params.org}`);

            const { code, message, completedTasks } = res as Response;

            if (code === 200) {
                tasks.getCompletedTasks(completedTasks);
            }
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function getOverdueTasks() {
        try {
            interface Response {
                code: any;
                message: any;
                overdueTasks: any;
            }
            if (tasks.overdueTasks > 0) {
                return;
            }
            const res = await useApiFetch(`/api/overdue/tasks/${router.currentRoute.value.params.org}`);

            const { code, message, overdueTasks } = res as Response;

            tasks.getOverdueTasks(overdueTasks);
        } catch (error: any) {
            switch (error.response.status) {
                case 500:
                    alert(error.response._data.data.message);
                    break;
                case 403:
                    alert(error.response._data.data.message);
                    break;
                case 404:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function createNewTask(input: any, assignees: any) {
        interface Response {
            code: any;
            message: string;
            newTask: any;
        }
        const res = await useApiFetch(`/api/task/create/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}`, "POST", {
            name: input.name,
            taskAssignees: assignees.value,
            description: input.description,
            priority: tasks.priorities,
            status: tasks.status,
            privacy: input.privacy,
            dueDate: (dateTime.dateTime instanceof Date) ? dateTime.dateTime.toISOString() : dateTime.dateTime,
            org: router.currentRoute.value.params.org,
            project: router.currentRoute.value.params.project,
        });
        const { code, message, newTask } = res as Response;

        switch (code) {
            case 200:
                tasks.pushNewTask(newTask);
                tasks.getTotalTasks(tasks.totalTasks + 1);
                popups.toggleNewTaskPopup(false);
                break;
            case 404:
                tasks.setMessages(message);
                break;
            case 500:
                tasks.setMessages(message);
                break;
            case 403:
                tasks.setMessages(message);
                break;
            case 422:
                const stringMessages = [];
                for (const messagesArray of Object.values(message)) {
                    if (Array.isArray(messagesArray)) {
                        stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                    }
                }
                tasks.setMessages(stringMessages);
                break;
            default:
                break;
        }
    }

    async function updateTask(assignees: any) {
        interface Response {
            code: any;
            message: string;
            task: any;
        }

        tasks.toggleUpdatingTask(true);

        const res = await useApiFetch(`/api/task/update/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}`, "PATCH", {
            title: tasks.selectedTask.title,
            task_assignees: assignees,
            description: tasks.selectedTask.description,
            priority: tasks.priorities,
            status: tasks.status,
            private: tasks.selectedTask.private,
            files: tasks.selectedTask.files,
            due_date: (dateTime.dateTime instanceof Date) ? dateTime.dateTime.toISOString() : dateTime.dateTime,
            org: router.currentRoute.value.params.org,
            project: router.currentRoute.value.params.project,
            task: tasks.selectedTask.task_uuid,
        }).finally(() => { tasks.toggleUpdatingTask(false) });

        const { code, message, task } = res as Response;

        switch (code) {
            case 200:
                if (uploadFile.newFiles.length > 0) {
                    uploadNewFiles();
                } else {
                    tasks.getSelectedTask(task);
                    tasks.updateTask(task.task_uuid, task.members, task.statuses, task.priorities, task.due_date);
                    tasks.refreshPriorities();
                    task.priorities.map((priority: any) => tasks.setPriorities(priority));
                }
                break;
            case 404:
                tasks.setMessages(message);
                break;
            case 500:
                tasks.setMessages(message);
                break;
            case 403:
                tasks.setMessages(message);
                break;
            case 422:
                const stringMessages = [];
                for (const messagesArray of Object.values(message)) {
                    if (Array.isArray(messagesArray)) {
                        stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                    }
                }
                tasks.setMessages(stringMessages);
                break;
            default:
                break;
        }
    }

    async function uploadNewFiles() {
        if (uploadFile.newFiles.length > 0) {
            interface Response {
                code: any;
                message: string;
                task: any;
            }

            let formData = new FormData();
            const config = useRuntimeConfig()

            for (let i = 0; i < uploadFile.newFiles.length; i++) {
                formData.append('newFiles[]', uploadFile.newFiles[i]);
            }
            tasks.toggleUploadingFiles(true);

            const res = await useApiFetch(`/api/task/upload/files/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}`,
                "POST", formData)
                .finally(() => {
                    tasks.toggleUploadingFiles(false);
                });

            const { code, message, task } = res as Response;

            if (code === 200) {
                uploadFile.pushNewFiles([]);
                tasks.getSelectedTask(task);
            }
        }
    }

    async function deleteTask() {
        interface Response {
            code: any;
            message: string;
        }
        tasks.toggleDeletingTask(true);
        const res = await useApiFetch(`/api/task/delete/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}`, "DELETE").finally(() => { tasks.toggleDeletingTask(false) });
        const { code, message } = res as Response;

        switch (code) {
            case 200:
                tasks.deleteTask(tasks.selectedTask.task_uuid);
                popups.toggleDeleteTaskPopup(false);
                popups.toggleEditTaskPopup(false);
                break;
            case 404:
                tasks.setMessages(message);
                break;
            case 500:
                tasks.setMessages(message);
                break;
            case 403:
                tasks.setMessages(message);
                break;
            case 422:
                const stringMessages = [];
                for (const messagesArray of Object.values(message)) {
                    if (Array.isArray(messagesArray)) {
                        stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                    }
                }
                tasks.setMessages(stringMessages);
                break;
            default:
                break;
        }
    }

    return {
        getTasks,
        getTotalTasks,
        getCompletedTasks,
        getOverdueTasks,
        createNewTask,
        updateTask,
        deleteTask,
    }
}