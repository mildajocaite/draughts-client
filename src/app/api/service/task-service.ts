import {RestService} from "../common/rest-service";
import {CommonResponseMessage} from "../common/CommonResponseMessage";
import {Task} from "../../model/task";
import {TaskForStudentToSolve} from "../../model/task-for-student-to-solve";

class TaskService {

    private readonly restService: RestService;

    constructor() {
        this.restService = new RestService();
    }

    public readonly getTasks = (): Promise<Task[]> => {
        return this.restService.get<Task[]>(`/task`);
    };

    public readonly getTaskByID = (id: number): Promise<Task> => {
        return this.restService.get<Task>(`/task/${id}`);
    };

    public readonly postTask = (data: Task): Promise<Task> => {
        return this.restService.post<Task>(`/task`, data);
    };

    public readonly deleteTask = (id: number): Promise<CommonResponseMessage> => {
        return this.restService.delete<CommonResponseMessage>(`/task/${id}`);
    };

    public readonly getTasksForStudentToSolve = (): Promise<TaskForStudentToSolve[]> => {
        return this.restService.get<TaskForStudentToSolve[]>(`/taskForUser`);
    };

    public readonly getTaskForStudentToSolve = (id: number): Promise<TaskForStudentToSolve> => {
        return this.restService.get<TaskForStudentToSolve>(`/taskForUser/${id}`);
    };

    public readonly checkIfStartPositionRight = (id: number): Promise<TaskForStudentToSolve> => {
        return this.restService.get<TaskForStudentToSolve>(`/checkStartPosition/${id}`);
    };

    public readonly checkIfSolutionRight = (id: number): Promise<TaskForStudentToSolve> => {
        return this.restService.get<TaskForStudentToSolve>(`/checkIfSolutionRight/${id}`);
    };

    public readonly getTaskForStudentOrCreateNew = (id: number): Promise<TaskForStudentToSolve> => {
        return this.restService.get<TaskForStudentToSolve>(`/taskForUserGetOrCreate/${id}`);
    };
}

const taskService = new TaskService();

export {taskService, TaskService}