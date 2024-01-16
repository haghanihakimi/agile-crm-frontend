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
        interface Response {
            code: any;
            message: string;
            newComment: string;
        }
        tasks.togglePostingComment(true);
        const res = await $fetch('/api/comments/post-comment', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                org: router.currentRoute.value.params.org,
                project: router.currentRoute.value.params.project,
                task: tasks.selectedTask.task_uuid,
                comment: tasks.newComment,
            }
        }).finally(() => {
            tasks.togglePostingComment(false);
        });

        const { code, message, newComment } = res as Response;

        switch (code) {
            case 200:
                console.log(newComment);
                tasks.postNewComment(newComment);
                break;
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

    async function deleteComment(input: any) {
        interface Response {
            code: any;
            message: string;
        }
        tasks.toggleDeletingComment(true);
        const res = await $fetch('/api/comments/delete-comment', {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
            },
            body: {
                org: router.currentRoute.value.params.org,
                project: router.currentRoute.value.params.project,
                task: tasks.selectedTask.task_uuid,
                comment: input
            }
        }).finally(() => {
            tasks.toggleDeletingComment(false);
        });
        const { code, message } = res as Response;

        switch (code) {
            case 200:
                popups.toggleDeleteCommentPopup(false, '');
                tasks.deleteComment(input);
                break;
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

    async function saveComment(id: string, commentInput: string,) {
        interface Response {
            code: any;
            message: string;
        }
        const res = await $fetch('/api/comments/edit-comment', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: {
                org: router.currentRoute.value.params.org,
                project: router.currentRoute.value.params.project,
                task: tasks.selectedTask.task_uuid,
                commentId: id,
                comment: commentInput,
            }
        });

        const { code, message } = res as Response;

        switch (code) {
            case 200:
                popups.toggleDeleteCommentPopup(false, '');
                tasks.editComment(id, commentInput);
                break;
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

    return {
        postComment,
        deleteComment,
        saveComment,
    }
}