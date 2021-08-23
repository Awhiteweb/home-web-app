import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {nanoid} from "nanoid";
import {ITodo, Todos} from "../todo.entities";
import {ChangeTodoStatus, CreateTodo, UpdateTodoGroup, UpdateTodoValue} from "./todos.actions";

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
                if(a.indexOf(c) == -1) {
                    a.push(c);
                }
                return a;
            }, []);
    }

    @Action(CreateTodo)
    createTodo(ctx: StateContext<TodoStateModel>, {todo}: CreateTodo) {
        const {incomplete} = ctx.getState();
        todo.id = nanoid();
        incomplete.push(todo);
        ctx.patchState({incomplete});
    }

    @Action(ChangeTodoStatus)
    changeTodoStatus(ctx: StateContext<TodoStateModel>, {id, completed}: ChangeTodoStatus) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id && t.completed != completed);
        const completeId = state.complete.findIndex(t => t.id == id && t.completed != completed);
        if(incompleteId > -1) {
            const item = state.incomplete.splice(incompleteId, 1)[0];
            state.complete.push(item);
        }
        else if(completeId > -1) {
            const item = state.complete.splice(completeId, 1)[0];
            state.incomplete.push(item);
        }
        ctx.setState(state);
    }

    @Action(UpdateTodoGroup)
    updateTodoGroup(ctx: StateContext<TodoStateModel>, {id, group}: UpdateTodoGroup) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id && t.group != group);
        const completeId = state.complete.findIndex(t => t.id == id && t.group != group);
        if(incompleteId > -1) {
            state.incomplete[incompleteId].group = group;
            ctx.patchState({incomplete: state.incomplete});
        }
        else if(completeId > -1) {
            state.complete[completeId].group = group;
            ctx.patchState({complete: state.complete});
        }
    }

    @Action(UpdateTodoValue)
    updateTodoValue(ctx: StateContext<TodoStateModel>, {id, value}: UpdateTodoValue) {
        const state = ctx.getState();
        const incompleteId = state.incomplete.findIndex(t => t.id == id && t.value != value);
        const completeId = state.complete.findIndex(t => t.id == id && t.value != value);
        if(incompleteId > -1) {
            state.incomplete[incompleteId].value = value;
            ctx.patchState({incomplete: state.incomplete});
        }
        else if(completeId > -1) {
            state.complete[completeId].value = value;
            ctx.patchState({complete: state.complete});
        }
    }
}