import {RestService} from "../common/rest-service";
import {LoginFormModel} from "../../page/login/model/LoginFormModel";
import {AuthDataModel} from "../../page/login/model/AuthDataModel";

class AuthService {

    private static readonly BASE_PATH: string = '/login';

    private readonly restService: RestService;

    constructor() {
        this.restService = new RestService();
    }

    public readonly login = (loginFormModel: LoginFormModel): Promise<AuthDataModel> => {
        return this.restService.post<AuthDataModel>(AuthService.BASE_PATH, loginFormModel);
    };
}

const authService = new AuthService();

export {authService, AuthService}