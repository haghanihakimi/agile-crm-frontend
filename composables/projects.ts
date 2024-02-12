import { useProjectsStore } from "~/server/store/projects";
import { usePopupsStore } from "~/server/store/popups";
import { useTasksStore } from "~/server/store/tasks";
import { useOrgsStore } from "~/server/store/organizations";

export default function useProjects() {
    const projects = useProjectsStore();
    const orgs = useOrgsStore();
    const tasks = useTasksStore();
    const popups = usePopupsStore();
    const router = useRouter();
    const cookies = useCookie('selection');

    async function getProjects() {
        try {
            interface Response {
                code: any;
                message: any;
                allProjects: any;
            }
            if (projects.projects.length > 0) {
                return
            }
            projects.setLoadingProjects(true);
            const res = await useApiFetch(`/api/project/read/projects/${orgs.activeOrganization.org_uuid}`)
                .finally(() => {
                    projects.setLoadingProjects(false)
                });

            const { code, message, allProjects } = res as Response;

            projects.getProjects(allProjects);
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

    async function currentProject() {
        try {
            interface Response {
                code: any;
                message: any;
                project: any;
            }
            if ((!projects.activeProject || Object.keys(projects.activeProject).length > 0) ||
                router.currentRoute.value.params.project === projects.activeProject.project_uuid) {
                return;
            }

            const res = await useApiFetch(`/api/project/active/project/${orgs.activeOrganization.org_uuid}/${router.currentRoute.value.params.project}`);
            const { code, message, project } = res as Response;
            projects.setCurrentProject(project);
            cookies.value !== project.project_uuid && tasks.getTodoTasks([]);
        } catch (error: any) {
            switch (error.response.status) {
                case 404:
                    if (router.currentRoute.value.params.project) {
                        navigateTo(`/board/${router.currentRoute.value.params.org}`);
                    }
                    break;
                case 500:
                    alert(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function createProject(input: any) {
        try {
            interface Response {
                code: any;
                message: string;
                newProject: any;
            }
            projects.setCreatingProject(true);

            const res = await useApiFetch(`/api/project/create/${orgs.activeOrganization.org_uuid}`, "POST", input)
                .finally(() => {
                    projects.setCreatingProject(false);
                });

            const { code, message, newProject } = res as Response;

            projects.pushNewProject(newProject);
            popups.toggleNewProjectPopup(false);
        } catch (error: any) {
            switch (error.response.status) {
                case 422:
                    const stringMessages = [];
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    projects.setMessages(stringMessages);
                    break;
                case 500:
                    projects.setMessages(error.response._data.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    async function getTotalProjects() {
        try {
            interface Response {
                code: any;
                message: any;
                projectsCount: any;
            }
            if (projects.totalProjects > 0) {
                return;
            }
            const res = await useApiFetch(`/api/project/total/count/${orgs.activeOrganization.org_uuid}`);
            const { code, message, projectsCount } = res as Response;

            if (code === 200) {
                projects.getTotalProjects(projectsCount);
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

    async function editProject() {
        try {
            interface Response {
                code: any;
                message: any;
                project: any;
            }
            projects.setEditingProject(true);

            const res = await useApiFetch(`/api/project/update/${orgs.activeOrganization.org_uuid}/${projects.selectedProject.project_uuid}`, "POST", {
                id: projects.selectedProject.project_uuid,
                title: projects.selectedProject.title,
                description: projects.selectedProject.description,
                private: projects.selectedProject.private,
                budget: projects.selectedProject.budget,
                org: router.currentRoute.value.params.org,
            }).finally(() => {
                projects.setEditingProject(false)
            });

            const { code, message, project } = res as Response;

            projects.getSelectedProject(project)
            projects.setMessages(message);
            projects.projects.forEach((item: any, i: any) => {
                if (item.project_uuid === project.project_uuid) {
                    item.title = project.title;
                }
            });
        } catch (error: any) {
            switch (error.response.status) {
                case 422:
                    const stringMessages = [];
                    for (const messagesArray of Object.values(error.response._data.data.message)) {
                        if (Array.isArray(messagesArray)) {
                            stringMessages.push(...messagesArray.filter(msg => typeof msg === 'string'));
                        }
                    }
                    projects.setMessages(stringMessages);
                    break;
                case 500:
                    projects.setMessages(error.response._data.data.message);
                    break;
                case 403:
                    projects.setMessages(error.response._data.data.message);
                    break;
                case 404:
                    projects.setMessages(error.response._data.data.message);
                    break;
                default:
                    projects.setMessages("OOPS! Sorry, something went wrong with updating messages!");
                    break;
            }
        }
    }

    async function deleteProject() {
        try {
            interface Response {
                code: any;
                message: any;
                deletedProject: any;
            }
            projects.setDeletingProject(true);
            const res = await useApiFetch(`/api/project/delete/${orgs.activeOrganization.org_uuid}/${projects.selectedProject.project_uuid}`, "DELETE").finally(() => {
                projects.setDeletingProject(false)
            });
            const { code, message } = res as Response;

            projects.deleteProject(projects.selectedProject);
            popups.toggleDeleteProjectPopup(false);
            popups.toggleEditProjectPopup(false);
            projects.getSelectedProject({});
            tasks.getTodoTasks([]);
            
            if (router.currentRoute.value.params.project) {
                navigateTo(`/board/${router.currentRoute.value.params.org}`); 
            }
        } catch (error: any) {
            switch (error.response.status) {
                case 422:
                    projects.setMessages(error.response._data.data.message);
                    break;
                case 500:
                    projects.setMessages(error.response._data.data.message);
                    break;
                case 403:
                    projects.setMessages(error.response._data.data.message);
                    break;
                case 404:
                    projects.setMessages(error.response._data.data.message);
                    break;
                default:
                    projects.setMessages("OOPS! Sorry, something went wrong with updating messages!");
                    break;
            }
        }
    }

    return {
        getProjects,
        currentProject,
        getTotalProjects,
        createProject,
        editProject,
        deleteProject,
    }
}