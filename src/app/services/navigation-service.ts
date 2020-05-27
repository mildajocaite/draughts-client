import {createBrowserHistory} from "history";

const BASE_PATH: string = '/';

const history = createBrowserHistory({basename: BASE_PATH});

class NavigationService {

    public readonly LOGIN: string = '/login';

    public readonly HOME: string = '/app/statistics';

    public readonly getCurrentPage = (): string => {
        return window.location.pathname;
    };

    public readonly redirectToLogin = (): void => {
        window.location.href = this.LOGIN;
    };

    public readonly redirectToHomePage = (): void => {
        history.push(this.HOME)
    };

    public readonly redirectToEditUser = (id: number): void => {
        history.push(`/app/user/${id}`);
    };

    public readonly redirectToUsersList = (): void => {
        history.push(`/app/user`);
    };

    public readonly redirectToBoardsList = (): void => {
        history.push(`/app/board`);
    };

    public readonly redirectToEditBoard = (id: number): void => {
        history.push(`/app/board/${id}`);
    };

    public readonly redirectToRecordingsList = (): void => {
        history.push(`/app/recording`);
    };

    public readonly redirectToEditRecording = (id: number): void => {
        history.push(`/app/recording/${id}`);
    };

    public readonly redirectToTasksList = (): void => {
        history.push(`/app/tasks`);
    };

    public readonly redirectToStudentTasksReview = (id: number): void => {
        history.push(`/app/tasks-student/review/${id}`);
    };

    public readonly redirectToStudentTasksList = (): void => {
        history.push(`/app/tasks-students`);
    };
}

const navigationService = new NavigationService();

export {history, navigationService}