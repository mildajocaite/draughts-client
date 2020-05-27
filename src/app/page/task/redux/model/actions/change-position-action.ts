import {Action} from "redux";
import {TaskActionType} from "../task-action-type";

export interface ChangePositionAction extends Action<typeof TaskActionType.CHANGE_POSITION> {
    position: number[][];
}