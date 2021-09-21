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

export class DeleteTodo {
    static readonly type = '[Todos] Delete Todo';
    constructor(public id: string) {}
}

export class DeleteTodoGroup {
    static readonly type = '[Todos] Delete Todo Group';
    constructor(public group: string) {}
}

export class FetchTodos {
    static readonly type = '[Todos] Fetch Todos';
    constructor() {}
}