import {RestService} from "../common/rest-service";
import {CommonResponseMessage} from "../common/CommonResponseMessage";
import {Game} from "../../model/game";
import {UpdateRecording} from "../../model/update-recording";

class GamesService {

    private readonly restService: RestService;

    constructor() {
        this.restService = new RestService();
    }

    public readonly getGames = (): Promise<Game[]> => {
        return this.restService.get<Game[]>(`/game`);
    };

    public readonly getRecordings = (): Promise<Game[]> => {
        return this.restService.get<Game[]>(`/recording`);
    };

    public readonly getRecording = (id: number): Promise<Game> => {
        return this.restService.get<Game>(`/recording/${id}`);
    };

    public readonly updateRecording = (data: UpdateRecording): Promise<Game> => {
        return this.restService.put<Game>(`/recording`, data);
    };

    public readonly postRecording = (data: Game): Promise<Game> => {
        return this.restService.post<Game>(`/recording`, data);
    };

    public readonly deleteRecording = (id: number): Promise<CommonResponseMessage> => {
        return this.restService.delete<CommonResponseMessage>(`/recording/${id}`);
    };
}

const gamesService = new GamesService();

export {gamesService, GamesService}