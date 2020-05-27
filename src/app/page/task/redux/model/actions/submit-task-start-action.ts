import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface SubmitTaskStartAction extends Action<typeof TaskActionType.SUBMIT_TASK_START> {
}