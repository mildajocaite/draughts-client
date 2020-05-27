import {RestService} from "../common/rest-service";
import {Board} from "../../model/board";
import {CommonResponseMessage} from "../common/CommonResponseMessage";

class BoardService {

    private readonly restService: RestService;

    constructor() {
        this.restService = new RestService();
    }

    public readonly getBoards = (): Promise<Board[]> => {
        return this.restService.get<Board[]>(`/board`);
    };

    public readonly getBoard = (id: number): Promise<Board> => {
        return this.restService.get<Board>(`/board/${id}`);
    };

    public readonly postBoard = (data: Board): Promise<Board> => {
        return this.restService.post<Board>(`/board`, data);
    };

    public readonly deleteBoard = (id: number): Promise<CommonResponseMessage> => {
        return this.restService.delete<CommonResponseMessage>(`/board/${id}`);
    };

    public readonly updateBoard = (data: Board): Promise<Board> => {
        return this.restService.put<Board>(`/board`, data);
    };
}

const boardService = new BoardService();

export {boardService, BoardService}