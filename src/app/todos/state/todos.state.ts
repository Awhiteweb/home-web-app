import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { nanoid } from "nanoid";
import { filter, tap } from "rxjs/operators";
import { ITodo, Todos } from "../todo.entities";
import { TodoService } from "../todos.service";
import { ChangeTodoStatus, CreateTodo, DeleteTodo, DeleteTodoGroup, FetchTodos, UpdateTodoGroup, UpdateTodoValue } from "./todos.actions";

interface TodoStateModel {
    incomplete: Todos;
    complete: Todos;
}

@State<TodoStateModel>({
    name: 'todos',
    defaults: {
        incomplete: [{
            completed: false,
            createdAt: new Date(),
            group: 'star',
            id: nanoid(),
            value: 'test todo'
        }],
        complete: []
    }
})
@Injectable()
export class TodosState {

    constructor(private todoService: TodoService) { }

    @Selector()
    static incompleteList(state: TodoStateModel) {
        return state.incomplete;
    }

    @Selector()
    static completedList(state: TodoStateModel) {
        return state.complete;
    }

    @Selector()
    static groupList(state: TodoStateModel) {
        return state.incomplete
            .map((todo: ITodo): string => todo.group)
            .concat(state.complete.map((todo: ITodo): string => todo.group))
            .reduce((a: string[], c: string) => {
                if (a.indexOf(c) == -1) {
                    a.push(c);
                }
                return a;
            }, []);
    }

    @Action(CreateTodo)
    createTodo(ctx: StateContext<TodoStateModel>, { todo }: CreateTodo) {
        const { incomplete } = ctx.getState();
        todo.id = nanoid();
        incomplete.push(todo);
        ctx.patchState({ incomplete });
    }

    @Action(ChangeTodoStatus)
    changeTodoStatus(ctx: StateContext<TodoStateModel>, { id, completed }: ChangeTodoStatus) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id && t.completed != completed);
        const completeId = state.complete.findIndex(t => t.id == id && t.completed != completed);
        return this.todoService.updateTodoStatus$(id, completed).pipe(
            filter(r => r),
            tap(r => {
                if (incompleteId > -1) {
                    const item = state.incomplete.splice(incompleteId, 1)[0];
                    state.complete.push(item);
                }
                else if (completeId > -1) {
                    const item = state.complete.splice(completeId, 1)[0];
                    state.incomplete.push(item);
                }
                ctx.setState(state);
            })
        )
    }

    @Action(UpdateTodoGroup)
    updateTodoGroup(ctx: StateContext<TodoStateModel>, { id, group }: UpdateTodoGroup) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id && t.group != group);
        const completeId = state.complete.findIndex(t => t.id == id && t.group != group);
        return this.todoService.updateTodoGroup$(id, group).pipe(
            filter(r => r),
            tap(r => {
                if (incompleteId > -1) {
                    state.incomplete[incompleteId].group = group;
                    ctx.patchState({ incomplete: state.incomplete });
                }
                else if (completeId > -1) {
                    state.complete[completeId].group = group;
                    ctx.patchState({ complete: state.complete });
                }
            }));
    }

    @Action(UpdateTodoValue)
    updateTodoValue(ctx: StateContext<TodoStateModel>, { id, value }: UpdateTodoValue) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id && t.value != value);
        const completeId = state.complete.findIndex(t => t.id == id && t.value != value);
        return this.todoService.updateTodoValue$(id, value).pipe(
            filter(r => r),
            tap(r => {
                if (incompleteId > -1) {
                    state.incomplete[incompleteId].value = value;
                    ctx.patchState({ incomplete: state.incomplete });
                }
                else if (completeId > -1) {
                    state.complete[completeId].value = value;
                    ctx.patchState({ complete: state.complete });
                }
            })
        )
    }

    @Action(FetchTodos)
    fetchTodos(ctx: StateContext<TodoStateModel>) {
        return this.todoService.getTodos$().pipe(
            tap(todos => {
                ctx.setState({
                    complete: todos.filter(t => t.completed),
                    incomplete: todos.filter(t => !t.completed)
                });
            })
        );
    }

    @Action(DeleteTodo)
    deleteTodo(ctx: StateContext<TodoStateModel>, { id }: DeleteTodo) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id);
        const completeId = state.complete.findIndex(t => t.id == id);
        return this.todoService.deleteTodo$(id).pipe(
            filter(r => r),
            tap(r => {
                if (incompleteId > -1) {
                    const item = state.incomplete.splice(incompleteId, 1)[0];
                    ctx.patchState({ incomplete: state.incomplete });
                }
                else if (completeId > -1) {
                    const item = state.complete.splice(completeId, 1)[0];
                    ctx.patchState({ complete: state.complete });
                }
            })
        );
    }

    @Action(DeleteTodoGroup)
    deleteTodoGroup(ctx: StateContext<TodoStateModel>, { group }: DeleteTodoGroup) {
        const state = ctx.getState();
        return this.todoService.deleteTodo$(group).pipe(
            filter(r => r),
            tap(r => {
                ctx.setState({
                    complete: state.complete.filter(t => t.group != group),
                    incomplete: state.incomplete.filter(t => t.group != group)
                });
            })
        );
    }
}