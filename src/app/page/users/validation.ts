import {User} from "../../model/user";
import {FormErrors} from "redux-form";
import {CreateUserModel} from "./create-user/create-user-model";

export const validate = (values: User) => {
    const errors: FormErrors<User, string> = {};
    if (!values.email) {
        errors.email = 'Privalomas laukas'
    }
    if (!values.firstname) {
        errors.firstname = 'Privalomas laukas'
    }
    if (!values.lastname) {
        errors.lastname = 'Privalomas laukas'
    }
    if (!values.password) {
        errors.password = 'Privalomas laukas'
    }
    if (!values.phone) {
        errors.phone = 'Privalomas laukas'
    }
    if (!values.role) {
        errors.role = 'Privalomas laukas'
    }
    return errors;
};

export const validateUserCreation = (values: CreateUserModel) => {
    const errors: FormErrors<CreateUserModel, string> = {};
    if (!values.email) {
        errors.email = 'Privalomas laukas'
    }
    if (!values.firstname) {
        errors.firstname = 'Privalomas laukas'
    }
    if (!values.lastname) {
        errors.lastname = 'Privalomas laukas'
    }
    if (!values.password) {
        errors.password = 'Privalomas laukas'
    }
    if (!values.phone) {
        errors.phone = 'Privalomas laukas'
    }
    if (!values.role) {
        errors.role = 'Privalomas laukas'
    }
    return errors;
};