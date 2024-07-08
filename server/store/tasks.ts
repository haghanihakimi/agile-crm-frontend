import { defineStore } from 'pinia'

interface TodoTasks {
    task_uuid: any;
    creator_id: any;
    title: any;
    description: any;
    due_date: any;
    private: any;
    statuses: Array<any>;
    priorities: Array<any>;
    members: Array<any>;
    comments: Array<any>;
    files: Array<any>;
}

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        todoTasks: [],
        selectedTask: {} as TodoTasks,
        totalTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
        loadingTodoTasks: false,
        newComment: '',
        uploadingFiles: false,
        postingComment: false,
        deletingComment: false,
        updatingTask: false,
        deletingTask: false,
        priorities: [
            { "title": "Low", 'is_selected': true, "id": 0 },
            { "title": "Medium", 'is_selected': false, "id": 0 },
            { "title": "High", 'is_selected': false, "id": 0 },
        ],
        status: [
            { "title": "Started", 'is_selected': true, "id": 0 },
            { "title": "Processing", 'is_selected': false, "id": 0 },
            { "title": "Done", 'is_selected': false, "id": 0 },
        ],
        messages: '',
    }),
    actions: {
        getTodoTasks(tasks: any) {
            this.todoTasks = tasks
        },
        updateTask(uuid: any, members: any, statuses: any, priorities: any, due_date: any) {
            let task = this.todoTasks.find((task: any) => task.task_uuid === uuid);

            if (task) {
                task.members = members;
                task.statuses = statuses;
                task.priorities = priorities;
                task.due_date = due_date;
            }
        },
        deleteTask(uuid: any) {
            let index = this.todoTasks.findIndex((task: any) => task.task_uuid === uuid);

            if (index > -1) {
                this.todoTasks.splice(index, 1);
            }
        },
        getSelectedTask(task: any) {
            this.selectedTask = task;
        },
        getTotalTasks(total: any) {
            this.totalTasks = total;
        },
        getCompletedTasks(count: any) {
            this.completedTasks = count;
        },
        getOverdueTasks(count: any) {
            this.overdueTasks = count;
        },
        pushNewTask(task: any) {
            this.todoTasks.push(task);
        },
        toggleLoadingTodoTasks(status: boolean) {
            this.loadingTodoTasks = status
        },
        selectPriority(clickedOption: any) {
            this.priorities.forEach((option) => {
                option.is_selected = option === clickedOption;
            });
        },
        setPriorities(val: any) {
            this.priorities.push({ "title": val.name, 'is_selected': val.is_selected, "id": val?.pivot?.priority_id });
        },
        refreshPriorities() {
            this.priorities = []
        },
        removePriorityItem(val: any) {
            const index = this.priorities.indexOf(val);
            if (index > -1) {
                this.priorities.splice(index, 1);
            }
        },
        selectStatus(clickedOption: any) {
            this.status.forEach((option) => {
                option.is_selected = option === clickedOption;
            });
        },
        setStatuses(val: any) {
            this.status.push({ "title": val.name, 'is_selected': val.is_selected, "id": val?.pivot?.status_id });
        },
        refreshStatuses() {
            this.status = []
        },
        removeStatusItem(val: any) {
            const index = this.status.indexOf(val);
            if (index > -1) {
                this.status.splice(index, 1);
            }
        },
        setMessages(message: any) {
            this.messages = message;
        },
        togglePostingComment(status: boolean) {
            this.postingComment = status;
        },
        postNewComment(comment: any) {
            this.selectedTask.comments.push(comment);
            this.newComment = '';
        },
        toggleUploadingFiles(status: boolean) {
            this.uploadingFiles = status
        },
        toggleDeletingComment(status: boolean) {
            this.deletingComment = status;
        },
        deleteComment(commentId: any) {
            const index = this.selectedTask.comments.findIndex((comment: any) => comment.comment_uuid === commentId);
            if (index !== -1) {
                this.selectedTask.comments.splice(index, 1);
            }
        },
        editComment(commentId: any, comment: string) {
            const index = this.selectedTask.comments.findIndex((comment: any) => comment.comment_uuid === commentId);
            if (index !== -1) {
                this.selectedTask.comments[index].comment = comment;
            }
        },
        toggleUpdatingTask(status: boolean) {
            this.updatingTask = status
        },
        toggleDeletingTask(status: boolean) {
            this.deletingTask = status
        },
    },
})