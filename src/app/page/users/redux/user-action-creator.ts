import {Dispatch} from "redux";
import {RootState} from "../../../redux/state/root-state";
import {getFormValues} from "redux-form";
import {navigationService} from "../../../services/navigation-service";
import {userService} from "../../../api/service/user-service";
import {User} from "../../../model/user";
import {openNotification} from "../../../services/notification-service";
import {store} from "../../../redux/store/store";
import {ErrorMessage} from "../../../api/common/error-message";
import {CreateUserModel} from "../create-user/create-user-model";

export const createUser = () => (dispatch: Dispatch, getState: () => RootState) => {
    const rootState: RootState = getState();

    const userFormData: CreateUserModel = getFormValues('create-user')(rootState) as any;

    return userService.postUser(userFormData)
        .then(response => {
            openNotification("success", "SĖKMINGAI IŠSAUGOTAS", `Naudotojas sėkmingai išsaugotas.`);
            navigationService.redirectToUsersList();
        })
        .catch((error: ErrorMessage) => {
                openNotification("error", "KLAIDA", error.message);
            }
        );
};

export const editUser = (id: number) => () => {
    const rootState: RootState = store.getState();

    const userFormData: User = getFormValues('edit-user')(rootState) as any;

    const userToUpdate = {
        ...userFormData,
        id: id,
    };

    return userService.putUser(userToUpdate)
        .then(response => {
            openNotification("success", "SĖKMINGAI PAREDAGUOTAS", `Naudotojas sėkmingai paredaguotas.`);
            navigationService.redirectToUsersList();
        })
        .catch((error: ErrorMessage) => {
                navigationService.redirectToUsersList();
                openNotification("error", "KLAIDA", error.message);
            }
        );
};