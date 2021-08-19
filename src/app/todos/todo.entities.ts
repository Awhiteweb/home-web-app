export interface ITodo {
    id: string;
    value: string;
    completed: boolean;
    createdAt: Date;
    completedAt: Date;
    group: string;
}

export type Todos = ITodo[];