import { defineStore } from 'pinia'

interface ActiveProject {
    id: any;
    project_uuid: any;
    creator_id: any;
    title: any;
    description: any;
    private: any;
    budget: any;
    created_at: any;
    updated_at: any;
}

interface Projects {
    value: any;
    label: any;
}

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        totalProjects: 0,
        activeProject: {} as ActiveProject,
        selectedProject: {} as ActiveProject,
        globalInit: false,
        loadingProjects: false,
        creatingProject: false,
        editingProject: false,
        deletingProject: false,
        messages: '',
    }),
    actions: {
        getProjects(projects: any) {
            this.projects = projects;
        },
        getTotalProjects(totals: any) {
            this.totalProjects = totals;
        },
        setCurrentProject(project: any) {
            this.activeProject = project;
        },
        pushNewProject(project: any) {
            this.projects.push(project);
        },
        setGlobalInit(init: boolean) {
            this.globalInit = init;
        },
        setLoadingProjects(status: boolean) {
            this.loadingProjects = status
        },
        setCreatingProject(status: boolean) {
            this.creatingProject = status
        },
        setEditingProject(status: boolean) {
            this.editingProject = status
        },
        setDeletingProject(status: boolean) {
            this.deletingProject = status;
        },
        setMessages(message: any) {
            this.messages = message
        },
        getSelectedProject(project: any) {
            this.selectedProject = project
        },
    },
})