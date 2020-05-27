import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface SubmitTaskSuccessAction extends Action<typeof TaskActionType.SUBMIT_TASK_SUCCESS> {
}