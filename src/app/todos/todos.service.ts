import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ApiService } from "../shared/services/api.service";
import { ITodo, Todos } from "./todo.entities";

@Injectable()
export class TodoService {

    constructor(private apiService: ApiService) {}

    getTodos$(): Observable<Todos> {
        return this.apiService.get<Todos>(`${environment.assetsUri}/todo-list`);
    }

    saveTodo$(todo: ITodo): Observable<boolean> {
        return this.apiService.post<boolean>(`${environment.lambdaUri}/todos/create`, JSON.stringify(todo));
    }

    updateTodoValue$(id: string, value: string): Observable<boolean> {
        return this.apiService.put<boolean>(`${environment.lambdaUri}/todos/update/value`, JSON.stringify({Id: id, Value: value}));
    }

    updateTodoStatus$(id: string, completed: boolean): Observable<boolean> {
        return this.apiService.put<boolean>(`${environment.lambdaUri}/todos/update/status`, JSON.stringify({Id: id, Completed: completed}));
    }

    updateTodoGroup$(id: string, group: string): Observable<boolean> {
        return this.apiService.put<boolean>(`${environment.lambdaUri}/todos/update/group`, JSON.stringify({Id: id, Group: group}));
    }

    deleteTodo$(id: string): Observable<boolean> {
        return this.apiService.delete<boolean>(`${environment.lambdaUri}/todos/delete/${id}`);
    }
}