import {Dispatch} from "redux";
import {RootState} from "../../../redux/state/root-state";
import {getFormValues} from "redux-form";
import {ChangePositionAction} from "./model/actions/change-position-action";
import {navigationService} from "../../../services/navigation-service";
import {TaskActionType} from "./model/task-action-type";
import {GoToPreviousStepAction} from "./model/actions/go-to-previous-step-action";
import {store} from "../../../redux/store/store";
import {openNotification} from "../../../services/notification-service";
import {ChangeSolutionAction} from "./model/actions/change-solution-action";
import {taskService} from "../../../api/service/task-service";
import {Task} from "../../../model/task";
import {SubmitTaskStartAction} from "./model/actions/submit-task-start-action";
import {SubmitTaskSuccessAction} from "./model/actions/submit-task-success-action";
import {SubmitTaskFailureAction} from "./model/actions/submit-task-failure-action";
import {ErrorMessage} from "../../../api/common/error-message";
import {checkIfBoardIsEmpty} from "../../../utils/draught-board-utils";


export const goToNextStep = () => (dispatch: Dispatch) => {
    const rootState: RootState = store.getState();
    switch (rootState.task.step) {
        case 0:
            if (checkIfBoardIsEmpty(rootState.task.position)) {
                openNotification("error",
                    "KLAIDA",
                    `Šaškių lenta negali būti tuščia. Pridėkite šaškių poziciją`
                );
            } else {
                const goToPreviousStep: GoToPreviousStepAction = {
                    type: TaskActionType.GO_TO_PREVIOUS_STEP,
                    step: rootState.task.step + 1,
                };
                dispatch(goToPreviousStep);
            }
            break;
        case 1:
            if (rootState.task.solution.length === 0) {
                openNotification("error",
                    "KLAIDA",
                    `Sprendimas negali būti tuščias. Pridėkite sprendimą.`
                );
            } else {
                const goToPreviousStep: GoToPreviousStepAction = {
                    type: TaskActionType.GO_TO_PREVIOUS_STEP,
                    step: rootState.task.step + 1,
                };
                dispatch(goToPreviousStep);
            }
            break;
        default:
            const goToPreviousStep: GoToPreviousStepAction = {
                type: TaskActionType.GO_TO_PREVIOUS_STEP,
                step: rootState.task.step + 1,
            };
            dispatch(goToPreviousStep);
    }
};

export const goToPreviousStep = () => (dispatch: Dispatch) => {
    const rootState: RootState = store.getState();

    const goToPreviousStep: GoToPreviousStepAction = {
        type: TaskActionType.GO_TO_PREVIOUS_STEP,
        step: rootState.task.step - 1,
    };
    dispatch(goToPreviousStep)
};

export const changePosition = (position: number[][]) => (dispatch: Dispatch) => {
    const changePositionAction: ChangePositionAction = {
        type: TaskActionType.CHANGE_POSITION,
        position: position,
    };
    dispatch(changePositionAction);
};

export const changeSolution = (moves: string[]) => (dispatch: Dispatch) => {
    const changeSolutionAction: ChangeSolutionAction = {
        type: TaskActionType.CHANGE_SOLUTION,
        moves: moves,
    };
    dispatch(changeSolutionAction)
};

export const submitTask = () => (dispatch: Dispatch) => {
    const rootState: RootState = store.getState();

    const taskFormData: Task = getFormValues('create-task')(rootState) as any;

    const submitStartAction: SubmitTaskStartAction = {
        type: TaskActionType.SUBMIT_TASK_START,
    };
    dispatch(submitStartAction);

    const taskToSave: Task = {
        ...taskFormData,
        position: rootState.task.position!,
        solution: rootState.task.solution!,
        taskType: taskFormData ? taskFormData.taskType : "KOMBINACIJA",
        taskResult: taskFormData ? taskFormData.taskResult : "WHITES_START_AND_WIN",
        taskComplexity: taskFormData ? taskFormData.taskComplexity : "EASY",
    };

    return taskService.postTask(taskToSave)
        .then(response => {
            openNotification("success", "SĖKMINGAI SUKURTAS", `Uždavinys sėkmingai sukurtas.`);
            const submitTaskSuccessAction: SubmitTaskSuccessAction = {
                type: TaskActionType.SUBMIT_TASK_SUCCESS,
            };
            dispatch(submitTaskSuccessAction);
            navigationService.redirectToTasksList();
        })
        .catch((error: ErrorMessage) => {
                navigationService.redirectToTasksList();
                const submitTaskFailureAction: SubmitTaskFailureAction = {
                    type: TaskActionType.SUBMIT_TASK_FAILURE,
                    reason: error.message,
                };
                dispatch(submitTaskFailureAction);
                openNotification("error", "KLAIDA", error.message);
            }
        );
};