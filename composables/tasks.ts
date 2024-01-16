import { useTasksStore } from "~/server/store/tasks";
import { useMemberstore } from "~/server/store/members";
import { useDateTimeStore } from '~/server/store/dateTime';
import { usePopupsStore } from "~/server/store/popups";
import { useUploadFileStore } from "~/server/store/uploadFile";

export default function useTasks() {
    const tasks = useTasksStore();
    const members = useMemberstore();
    const router = useRouter();
    const dateTime = useDateTimeStore();
    const popups = usePopupsStore();
    const uploadFile = useUploadFileStore();

    async function getTasks() {
        interface Response {
            code: any;
            message: any;
            todoTasks: any;
        }
        if (tasks.todoTasks.length <= 0) {
            tasks.toggleLoadingTodoTasks(true);
            const res = await $fetch('/api/tasks/get-tasks', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                    project: router.currentRoute.value.params.project,
                }
            }).finally(() => {
                tasks.toggleLoadingTodoTasks(false);
            });

            const { code, message, todoTasks } = res as Response;

            if (code === 200) {
                tasks.getTodoTasks(todoTasks);
            }
        }
    }

    async function getTotalTasks() {
        interface Response {
            code: any;
            message: any;
            totalTasks: any;
        }
        if (tasks.totalTasks <= 0) {
            const res = await $fetch('/api/tasks/total-tasks', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                }
            });

            const { code, message, totalTasks } = res as Response;

            if (code === 200) {
                tasks.getTotalTasks(totalTasks);
            }
        }
    }

    async function getCompletedTasks() {
        interface Response {
            code: any;
            message: any;
            completedTasks: any;
        }
        if (tasks.completedTasks <= 0) {
            const res = await $fetch('/api/tasks/completed-tasks', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                }
            });

            const { code, message, completedTasks } = res as Response;

            if (code === 200) {
                tasks.getCompletedTasks(completedTasks);
            }
        }
    }

    async function getOverdueTasks() {
        interface Response {
            code: any;
            message: any;
            overdueTasks: any;
        }
        if (tasks.overdueTasks <= 0) {
            const res = await $fetch('/api/tasks/overdue-tasks', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                }
            });

            const { code, message, overdueTasks } = res as Response;

            if (code === 200) {
                tasks.getOverdueTasks(overdueTasks);
            }
        }
    }

    async function createNewTask(input: any) {
        interface Response {
            code: any;
            message: string;
            newTask: any;
        }
        const res = await $fetch('/api/tasks/create-task', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                name: input.name,
                taskAssignees: members.projectAssignees.value,
                description: input.description,
                priority: tasks.priorities,
                status: tasks.status,
                privacy: input.privacy,
                dueDate: (dateTime.dateTime instanceof Date) ? dateTime.dateTime.toISOString() : dateTime.dateTime,
                org: router.currentRoute.value.params.org,
                project: router.currentRoute.value.params.project,
            }
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

        const res = await $fetch('/api/tasks/update-task', {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
            },
            body: {
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
            }
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

            for (let i = 0; i < uploadFile.newFiles.length; i++) {
                formData.append('newFiles[]', uploadFile.newFiles[i]);
            }
            tasks.toggleUploadingFiles(true);

            const res = await $fetch(`http://localhost:443/api/task/upload/files/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${useCookie('auth').value}`,
                    'X-CSRF-TOKEN': useCookie('XSRF-TOKEN').value || '',
                },
                body: formData
            }).finally(() => {
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
        const res = await $fetch('/api/tasks/delete-task', {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
            },
            body: {
                org: router.currentRoute.value.params.org,
                project: router.currentRoute.value.params.project,
                task: tasks.selectedTask.task_uuid
            }
        }).finally(() => { tasks.toggleDeletingTask(false) });
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