import { useProjectsStore } from "~/server/store/projects";
import { usePopupsStore } from "~/server/store/popups";
import { useTasksStore } from "~/server/store/tasks";

export default function useProjects() {
    const projects = useProjectsStore();
    const tasks = useTasksStore();
    const popups = usePopupsStore();
    const router = useRouter();
    const cookies = useCookie('selection');

    async function getProjects() {
        interface Response {
            code: any;
            message: any;
            allProjects: any;
        }
        if (projects.projects.length <= 0) {
            projects.setLoadingProjects(true);
            const res = await $fetch('/api/projects/get-projects', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                }
            }).finally(() => {
                projects.setLoadingProjects(false)
            });
            const { code, message, allProjects } = res as Response;

            projects.getProjects(allProjects);
        }
    }

    async function currentProject() {
        interface Response {
            code: any;
            message: any;
            project: any;
        }
        if ((projects.activeProject && Object.keys(projects.activeProject).length <= 0) || 
        router.currentRoute.value.params.project !== projects.activeProject.project_uuid) {
            const res = await $fetch('/api/projects/current-project', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                    project: router.currentRoute.value.params.project,
                }
            });
            const { code, message, project } = res as Response;
            switch (code) {
                case 200:
                    projects.setCurrentProject(project);
                    cookies.value !== project.project_uuid && tasks.getTodoTasks([]);
                    break;
                case 404:
                    if (router.currentRoute.value.params.project) {
                        navigateTo(`/board/${router.currentRoute.value.params.org}`);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    // Temporary/Redundant
    async function getSelectedProject(uuid: any) {
        interface Response {
            code: any;
            message: any;
            project: any;
        }
        const res = await $fetch('/api/projects/selected-project', {
            method: "GET",
            params: {
                org: router.currentRoute.value.params.org,
                project: uuid,
            }
        });
        const { code, message, project } = res as Response;

        if (code === 200) {
            projects.getSelectedProject(project);
        }
    }

    async function createProject(input: any) {
        interface Response {
            code: any;
            message: string;
            newProject: any;
        }
        projects.setCreatingProject(true);

        const res = await $fetch('/api/projects/create-project', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: input
        }).finally(() => {
            projects.setCreatingProject(false);
        });

        const { code, message, newProject } = res as Response;
        
        switch (code) {
            case 200:
                projects.pushNewProject(newProject);
                popups.toggleNewProjectPopup(false);
                break;
            case 422:
                const stringMessages = [];
                for (const messagesArray of Object.values(message)) {
                    if (Array.isArray(messagesArray)) {
                        stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                    }
                }
                projects.setMessages(stringMessages);
                break;
            case 500:
                projects.setMessages(message);
                break;
            default:
                break;
        }
    }

    async function getTotalProjects() {
        interface Response {
            code: any;
            message: any;
            projectsCount: any;
        }
        if (projects.activeProject && Object.keys(projects.activeProject).length <= 0) {
            const res = await $fetch('/api/projects/total-projects', {
                method: "GET",
                params: {
                    org: router.currentRoute.value.params.org,
                }
            });
            const { code, message, projectsCount } = res as Response;

            if (code === 200) {
                projects.getTotalProjects(projectsCount);
            }
        }
    }

    async function editProject() {
        interface Response {
            code: any;
            message: any;
            project: any;
        }
        projects.setEditingProject(true);
        const res = await $fetch('/api/projects/update-project', {
            method: "POST",
            body: {
                id: projects.selectedProject.project_uuid,
                title: projects.selectedProject.title,
                description: projects.selectedProject.description,
                private: projects.selectedProject.private,
                budget: projects.selectedProject.budget,
                org: router.currentRoute.value.params.org,
            }
        }).finally(() => {
            projects.setEditingProject(false)
        });
        const { code, message, project } = res as Response;

        switch (code) {
            case 200:
                projects.getSelectedProject(project)
                projects.setMessages(message);
                projects.projects.forEach((item: any, i: any) => {
                    if (item.project_uuid === project.project_uuid) {
                        item.title = project.title;
                    }
                });
                break;
            case 422:
                const stringMessages = [];
                for (const messagesArray of Object.values(message)) {
                    if (Array.isArray(messagesArray)) {
                        stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                    }
                }
                projects.setMessages(stringMessages);
                break;
            case 500:
                projects.setMessages(message);
                break;
            case 403:
                projects.setMessages(message);
                break;
            case 404:
                projects.setMessages(message);
                break;
            default:
                projects.setMessages("OOPS! Sorry, something went wrong with updating messages!");
                break;
        }
    }

    async function deleteProject() {
        interface Response {
            code: any;
            message: any;
            deletedProject: any;
        }
        projects.setDeletingProject(true);
        const res = await $fetch('/api/projects/delete-project', {
            method: "DELETE",
            body: {
                id: projects.selectedProject.project_uuid,
                org: router.currentRoute.value.params.org,
            }
        }).finally(() => {
            projects.setDeletingProject(false)
        });
        const { code, message } = res as Response;

        switch (code) {
            case 200:
                const index = projects.projects.findIndex((project: any) => project.project_uuid == projects.selectedProject.project_uuid);
                if (index !== -1) {
                    projects.projects.splice(index, 1);
                }
                popups.toggleDeleteProjectPopup(false);
                popups.toggleEditProjectPopup(false);
                projects.getSelectedProject({});
                tasks.getTodoTasks([]);
                navigateTo(`/board/${router.currentRoute.value.params.org}`);
                break;
            case 422:
                projects.setMessages(message);
                break;
            case 500:
                projects.setMessages(message);
                break;
            case 403:
                projects.setMessages(message);
                break;
            case 404:
                projects.setMessages(message);
                break;
            default:
                projects.setMessages("OOPS! Sorry, something went wrong with updating messages!");
                break;
        }
    }

    return {
        getProjects,
        currentProject,
        getSelectedProject,
        getTotalProjects,
        createProject,
        editProject,
        deleteProject,
    }
}