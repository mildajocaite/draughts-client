import {RestService} from "../common/rest-service";
import {PossibleMove} from "../../model/possible-move";

export interface RequestPossibleMoves {
    isWhite: boolean,
    position: number[][],
}

class MoveServices {

    private readonly restService: RestService;

    constructor() {
        this.restService = new RestService();
    }

    public readonly getPossibleMoves = (data: RequestPossibleMoves): Promise<PossibleMove[]> => {
        return this.restService.put<PossibleMove[]>(`/api/possible-moves`, data);
    };
}

const movesService = new MoveServices();

export {movesService, MoveServices}