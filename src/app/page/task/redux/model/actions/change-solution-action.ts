import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface ChangeSolutionAction extends Action<typeof TaskActionType.CHANGE_SOLUTION> {
    moves: string[];
}