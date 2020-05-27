import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface GoToPreviousStepAction extends Action<typeof TaskActionType.GO_TO_PREVIOUS_STEP> {
    step: number,
}