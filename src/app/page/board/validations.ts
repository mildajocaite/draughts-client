import {FormErrors} from "redux-form";
import {Board} from "../../model/board";

export const validate = (values: Board) => {
    const errors: FormErrors<Board, string> = {};
    if (!values.name) {
        errors.name = 'Privalomas laukas'
    }
    if (!values.code) {
        errors.code = 'Privalomas laukas'
    }
    return errors;
};