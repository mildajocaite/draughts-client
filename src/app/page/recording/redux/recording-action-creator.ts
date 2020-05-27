import {Dispatch} from "redux";
import {RootState} from "../../../redux/state/root-state";
import {getFormValues} from "redux-form";
import {navigationService} from "../../../services/navigation-service";
import {openNotification} from "../../../services/notification-service";
import {store} from "../../../redux/store/store";
import {gamesService} from "../../../api/service/games-service";
import {ErrorMessage} from "../../../api/common/error-message";
import {Game} from "../../../model/game";
import {UpdateRecording} from "../../../model/update-recording";

export const createRecording = () => (dispatch: Dispatch, getState: () => RootState) => {
    const rootState: RootState = getState();

    const recordingFormData: Game = getFormValues('create-recording')(rootState) as any;
    return gamesService.postRecording(recordingFormData)
        .then(response => {
            openNotification("success", "SĖKMINGAI IŠSAUGOTAS", `Partijos įrašymas pradėtas`);
            navigationService.redirectToRecordingsList();
        })
        .catch((error: ErrorMessage) => {
                navigationService.redirectToRecordingsList();
                openNotification("error", "KLAIDA", error.message);
            }
        );
};

export const updateRecording = (id: number) => (dispatch: Dispatch) => {
    const rootState: RootState = store.getState();

    const recordingFormData: UpdateRecording = getFormValues('edit-recording')(rootState) as any;

    const recordingToUpdate = {
        ...recordingFormData,
        id: id,
        status: "RECORDED",
    };

    return gamesService.updateRecording(recordingToUpdate)
        .then(response => {
            openNotification("success", "SĖKMINGAI UŽBAIGTAS", `Partijos įrašymas sėkmingai užbaigtas.`);
            navigationService.redirectToRecordingsList();
        })
        .catch((error: ErrorMessage) => {
                navigationService.redirectToRecordingsList();
                openNotification("error", "KLAIDA", error.message);
            }
        );
};