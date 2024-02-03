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
                code: any;
                message: string;
                newComment: string;
            }
            tasks.togglePostingComment(true);
            const res = await useApiFetch(`/api/comment/task/post/comment/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}`,
                "POST", {
                comment: tasks.newComment,
            }).finally(() => {
                tasks.togglePostingComment(false);
            });

            const { code, message, newComment } = res as Response;

            tasks.postNewComment(newComment);
        } catch (error: any) {
            switch (error.response.status) {
                case 404:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 500:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 403:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 422:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                default:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
            }
        }
    }

    async function deleteComment(input: any) {
        try {
            interface Response {
                code: any;
                message: string;
            }
            tasks.toggleDeletingComment(true);
            const res = await useApiFetch(`/api/comment/task/delete/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}/${input}`,
                "DELETE").finally(() => {
                    tasks.toggleDeletingComment(false);
                });
            const { code, message } = res as Response;
            popups.toggleDeleteCommentPopup(false, '');
            tasks.deleteComment(input);
        } catch (error: any) {
            switch (error.response.status) {
                case 404:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 500:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 403:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 422:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                default:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
            }
        }
    }

    async function saveComment(id: string, commentInput: string,) {
        try {
            interface Response {
                code: any;
                message: string;
            }
            const res = await useApiFetch(`/api/comment/task/save/comment/${router.currentRoute.value.params.org}/${router.currentRoute.value.params.project}/${tasks.selectedTask.task_uuid}/${id}`,
                "POST", {
                comment: commentInput,
            });

            const { code, message } = res as Response;

            popups.toggleDeleteCommentPopup(false, '');
            tasks.editComment(id, commentInput);

        } catch (error: any) {
            switch (error.response.status) {
                case 404:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 500:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 403:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                case 422:
                    popups.toggleDeleteCommentPopup(false, '');
                    break;
                default:
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