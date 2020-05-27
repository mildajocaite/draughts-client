import {SubmitTaskStartAction} from "./actions/submit-task-start-action";
import {ChangePositionAction} from "./actions/change-position-action";
import {ChangeSolutionAction} from "./actions/change-solution-action";
import {SubmitTaskSuccessAction} from "./actions/submit-task-success-action";
import {SubmitTaskFailureAction} from "./actions/submit-task-failure-action";
import {GoToNextStepAction} from "./actions/go-to-next-step-action";
import {GoToPreviousStepAction} from "./actions/go-to-previous-step-action";

export type TaskActions =
    ChangePositionAction
    | ChangeSolutionAction
    | SubmitTaskStartAction
    | SubmitTaskSuccessAction
    | SubmitTaskFailureAction
    | GoToNextStepAction
    | GoToPreviousStepAction;