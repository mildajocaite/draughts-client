export interface StudentTasksTypeStatistics {
    type: string,
    numberOfResolvedTasks: number,
}

export interface StudentsStatistics {
    total: number,
    numberOfResolvedEasyTasks: number,
    numberOfResolvedMediumTasks: number,
    numberOfResolvedHardTasks: number,
    tasksTypeStatistics: StudentTasksTypeStatistics[],
    numberOfTries: number,
    numberOfResolutionTimes: number,
}