import {RestService} from "../common/rest-service";
import {User} from "../../model/user";
import {CommonResponseMessage} from "../common/CommonResponseMessage";
import {CreateUserModel} from "../../page/users/create-user/create-user-model";

class UserService {

    private readonly restService: RestService;

    constructor() {
        this.restService = new RestService();
    }

    public readonly getUsers = (): Promise<User[]> => {
        return this.restService.get<User[]>(`/user`);
    };

    public readonly getUser = (id: number): Promise<User> => {
        return this.restService.get<User>(`/user/${id}`);
    };

    public readonly postUser = (data: CreateUserModel): Promise<User> => {
        return this.restService.post<User>(`/user`, data);
    };

    public readonly putUser = (data: User): Promise<User> => {
        return this.restService.put<User>(`/user`, data);
    };

    public readonly deleteUser = (id: number): Promise<CommonResponseMessage> => {
        return this.restService.delete<CommonResponseMessage>(`/user/${id}`);
    };

    public readonly getCoaches = (): Promise<User[]> => {
        return this.restService.get<User[]>(`/coach`);
    };

    public readonly getStudents= (): Promise<User[]> => {
        return this.restService.get<User[]>(`/student`);
    };
}

const userService = new UserService();

export {userService, UserService}