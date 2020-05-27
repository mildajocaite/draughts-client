import {Task} from "./task";

export interface TaskForStudentToSolve {
    id: number,
    taskDTO: Task,
    userID: number,
    taskStatus: string,
    resolvedDate: Date,
}