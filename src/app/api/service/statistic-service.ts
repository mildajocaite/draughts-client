import {RestService} from "../common/rest-service";
import {TopTask} from "../../components/domain/top-tasks/model/TopTask";
import {TopStudent} from "../../components/domain/top-students/model/top-student";
import {ResolvedTasksPerDay} from "../../components/domain/bar-chart/model/resolved-tasks-per-day";
import {StudentsStatistics} from "../../model/studentsStatistics";
import {AuthService} from "../../services/auth-service";

class StatisticService{

    private readonly restService: RestService;

    constructor(){
        this.restService = new RestService();
    }

    public readonly getTopTasks = (): Promise<TopTask[]> =>{
        return this.restService.get<TopTask[]>(`/top10MostPopularTasks`);
    };

    public readonly getTopStudents = (startDate: string, endDate: string): Promise<TopStudent[]> =>{
        return this.restService.get<TopStudent[]>(`/usersOrderedByResolvedTasks/${startDate}/${endDate}`);
    };

    public readonly getResolvedTasksPerDay = (startDate: string, endDate: string, email: string): Promise<ResolvedTasksPerDay[]> =>{
        const userRole = AuthService.getRoles();
        if(userRole!.some(role => role.authority === "ROLE_STUDENT")){
            return this.restService.get<ResolvedTasksPerDay[]>(`/numberOfResolvedTasksPerDayForStudent/${startDate}/${endDate}`);
        }
        else{
            return this.restService.get<ResolvedTasksPerDay[]>(`/numberOfResolvedTasksPerDay/${startDate}/${endDate}/${email}`);
        }
    };

    public readonly getStudentsStatistic = (email:string): Promise<StudentsStatistics> =>{
        const userRole = AuthService.getRoles();
        if(userRole!.some(role => role.authority === "ROLE_STUDENT")){
            return this.restService.get<StudentsStatistics>(`/studentOwnStatistics`);
        }
        else{
            return this.restService.get<StudentsStatistics>(`/studentStatistics/${email}`);
        }
    };
}

const statisticService = new StatisticService();

export {statisticService, StatisticService}