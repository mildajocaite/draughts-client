import {User} from "../../model/user";
import {FormErrors} from "redux-form";
import {Game} from "../../model/game";

export const validate = (values: Game) => {
    const errors: FormErrors<User, string> = {};
    if (!values.player1) {
        errors.email = 'Privalomas laukas'
    }
    if (!values.player2) {
        errors.firstname = 'Privalomas laukas'
    }
    return errors;
};