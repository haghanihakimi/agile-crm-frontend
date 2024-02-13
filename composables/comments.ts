import { useTasksStore } from "~/server/store/tasks";
import { useMemberstore } from "~/server/store/members";
import { useTimeframesStore } from '~/server/store/timeframes';
import { usePopupsStore } from "~/server/store/popups";
import { useProjectsStore } from "~/server/store/projects";

export default function useComments() {
    const tasks = useTasksStore();
    const router = useRouter();
    const popups = usePopupsStore();

    async function postComment() {
        try {
            interface Response {
                code: number;
                message: string;
                newComment: object;
            }
            tasks.togglePostingComment(true);
            const res = await useApiFetch(`/api/comment/task/post/comment/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}`,
                "POST", {
                comment: tasks.newComment,
            }).finally(() => {
                tasks.togglePostingComment(false);
            });

            const { newComment } = res as Response;

            tasks.postNewComment(newComment);
        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 404:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 500:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 403:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    tasks.setMessages(stringMessages);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                default:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
            }
        }
    }

    async function deleteComment(input: any) {
        try {
            tasks.toggleDeletingComment(true);
            const res = await useApiFetch(`/api/comment/task/delete/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}/${input}`,
                "DELETE").finally(() => {
                    tasks.toggleDeletingComment(false);
                });

            popups.toggleDeleteCommentPopup(false, '');
            tasks.deleteComment(input);
        } catch (error: any) {
            switch (error.response.status) {
                case 404:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 500:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 403:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 422:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                default:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
            }
        }
    }

    async function saveComment(id: string, commentInput: string,) {
        try {
            const res = await useApiFetch(`/api/comment/task/save/comment/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}/${id}`,
                "POST", {
                comment: commentInput,
            });

            popups.toggleDeleteCommentPopup(false, '');
            tasks.editComment(id, commentInput);

        } catch (error: any) {
            const stringMessages = [];

            switch (error.response.status) {
                case 404:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 500:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 403:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 422:
                    for (const messagesArray of Object.values(error.response._data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    tasks.setMessages(stringMessages);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                default:
                    tasks.setMessages(error.response._data.message);
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
            }
        }
    }

    return {
        postComment,
        deleteComment,
        saveComment,
    }
}