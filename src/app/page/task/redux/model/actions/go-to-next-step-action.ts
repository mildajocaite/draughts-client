import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface GoToNextStepAction extends Action<typeof TaskActionType.GO_TO_NEXT_STEP> {
    step: number,
}