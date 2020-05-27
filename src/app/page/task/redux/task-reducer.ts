import {TaskState} from "./model/task-state";
import {TaskActions} from "./model/task-actions";
import {TaskActionType} from "./model/task-action-type";
import {emptyBoard} from "../../../utils/draught-board-utils";

const initialTaskState: TaskState = {
    initialized: false,
    position: emptyBoard(),
    solution: [],
    step: 0,
};

const taskReducer = (state: TaskState = initialTaskState, action: TaskActions): TaskState => {
    switch (action.type) {
        case TaskActionType.CHANGE_POSITION:
            return {
                ...state,
                position: action.position,
                solution: [],
            };
        case TaskActionType.CHANGE_SOLUTION:
            return {
                ...state,
                solution: action.moves,
            };
        case TaskActionType.GO_TO_PREVIOUS_STEP:
            return {
                ...state,
                step: action.step,
            };
        case TaskActionType.GO_TO_NEXT_STEP:
            return {
                ...state,
                step: action.step,
            };
        case TaskActionType.SUBMIT_TASK_START:
            return {
                ...state,
                initialized: true,
            };
        case TaskActionType.SUBMIT_TASK_SUCCESS:
            return {
                ...state,
                initialized: false,
                position: emptyBoard(),
                solution: [],
                step: 0,
            };
        case TaskActionType.SUBMIT_TASK_FAILURE:
            return {
                ...state,
                failureReason: action.reason,
            };
    }

    return state;
};

export {taskReducer};