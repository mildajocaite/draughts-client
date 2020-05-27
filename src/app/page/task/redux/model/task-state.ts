export interface TaskState {
    initialized: boolean;
    step: number;
    position: number[][];
    solution: string[];
    failureReason?: string;
}