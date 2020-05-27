import {Dispatch} from "redux";
import {RootState} from "../../../redux/state/root-state";
import {getFormValues} from "redux-form";
import {navigationService} from "../../../services/navigation-service";
import {openNotification} from "../../../services/notification-service";
import {store} from "../../../redux/store/store";
import {boardService} from "../../../api/service/board-service";
import {Board} from "../../../model/board";
import {ErrorMessage} from "../../../api/common/error-message";

export const createBoard = () => (dispatch: Dispatch, getState: () => RootState) => {
    const rootState: RootState = getState();

    const boardFormData: Board = getFormValues('create-board')(rootState) as any;
    return boardService.postBoard(boardFormData)
        .then(response => {
            openNotification("success", "SĖKMINGAI IŠSAUGOTA", `Šaškių lenta sėkmingai išsaugota.`);
            navigationService.redirectToBoardsList();
        })
        .catch((error: ErrorMessage) => {
                navigationService.redirectToBoardsList();
                openNotification("error", "KLAIDA", error.message);
            }
        )
};

export const editBoard = (id: number) => (dispatch: Dispatch) => {
    const rootState: RootState = store.getState();

    const boardFormData: Board = getFormValues('edit-board')(rootState) as any;

    const boardToUpdate = {
        ...boardFormData,
        id: id,
    };

    return boardService.updateBoard(boardToUpdate)
        .then(response => {
            openNotification("success", "SĖKMINGAI PAREDAGUOTA", `Šaškių lentos duomenys sėkmingai paredaguoti.`);
            navigationService.redirectToBoardsList();
        })
        .catch((error: ErrorMessage) => {
                navigationService.redirectToBoardsList();
                openNotification("error", "KLAIDA", error.message);
            }
        )
};