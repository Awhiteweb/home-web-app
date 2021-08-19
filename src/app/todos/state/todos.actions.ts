import {ITodo} from "../todo.entities";

export class CreateTodo {
    static readonly type = '[Todos] Create Todo';
    constructor(public todo: ITodo) {}
}

export class ChangeTodoStatus {
    static readonly type = '[Todos] Change Todo Status';
    constructor(public id: string, public completed: boolean) {}
}

export class UpdateTodoValue {
    static readonly type = '[Todos] Update Todo Value';
    constructor(public id: string, public value: string) {}
}

export class UpdateTodoGroup {
    static readonly type = '[Todos] Update Todo Group';
    constructor(public id: string, public group: string) {}
}