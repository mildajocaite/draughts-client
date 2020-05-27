import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface SubmitTaskFailureAction extends Action<typeof TaskActionType.SUBMIT_TASK_FAILURE> {
    reason: string,
}