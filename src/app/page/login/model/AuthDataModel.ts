import {Authority} from "../redux/model/auth-state";

export interface AuthDataModel {
    token: string;
    type: string;
    email: string;
    authorities: Authority[];
}