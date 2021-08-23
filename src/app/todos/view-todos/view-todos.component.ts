import {Component, OnInit, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__} from "@angular/core";
import {Select, Store} from "@ngxs/store";
import {isBefore, isSameDay, parse} from "date-fns";
import {BehaviorSubject, Observable, combineLatest} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {TodosState} from "../state/todos.state";
import {ITodo, Todos} from "../todo.entities";

type OrderColumn = "date" | "group" | "completed" | "value";

interface Ordering {
    column: OrderColumn;
    asc: boolean;
}

type FilterColumn = "date" | "group" | "value" | "all";
interface Filtering {
    column: FilterColumn;
    value: string;
}

@Component({
    selector: 'app-todo-list',
    templateUrl: './view-todos.component.html'
})
export class ViewTodosComponent implements OnInit {

    private filterTypes: FilterColumn[] = ["date", "group", "value", "all"];
    private filter$: BehaviorSubject<Filtering> = new BehaviorSubject<Filtering>({
        column: "all",
        value: ""
    });
    private statusFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private ordering$: BehaviorSubject<Ordering> = new BehaviorSubject<Ordering>({
        column: "date",
        asc: true
    });
    private displayList$!: Observable<Todos>;
    private filteredTodos$!: Observable<Todos>;

    @Select(TodosState.incompleteList)
    private incompleteList$!: Observable<Todos>;
    @Select(TodosState.completedList)
    private completedList$!: Observable<Todos>;

    todos$!: Observable<Todos>;

    constructor(private store: Store) { }

    ngOnInit() {

        this.displayList$ = combineLatest([this.statusFilter$, this.incompleteList$, this.completedList$]).pipe(
            map(([filter, incompleteList, completedList]) => {
                return filter ? completedList : incompleteList;
            })
        );
        this.filteredTodos$ = combineLatest([this.filter$, this.displayList$]).pipe(
            map(([filter, displayList]) => {
                if(filter.value == null || filter.value.length < 1) {
                    return displayList;
                }
                return displayList.filter((todo: ITodo) => {
                    switch(filter.column) {
                        case "date":
                            return this.dateFilter(todo, filter.value);
                        case "group":
                            return this.groupFilter(todo, filter.value);
                        case "value":
                            return this.valueFilter(todo, filter.value);
                        default:
                            return this.groupFilter(todo, filter.value)
                                || this.valueFilter(todo, filter.value)
                                || this.dateFilter(todo, filter.value);
                    }
                });
            }),
            debounceTime(200)
        );
        this.todos$ = combineLatest([this.ordering$, this.filteredTodos$]).pipe(
            map(([ordering, list]) => {
                switch(ordering.column) {
                    case "date":
                        return this.dateColumnSorting(list, ordering.asc);
                    case "completed":
                        return this.booleanColumnSorting(list, ordering.asc);
                    default:
                        return this.txtColumnSorting(list, ordering.asc);
                }
            })
        );
    }

    applyFilter(arg: string) {
        const separatorIdx = arg.indexOf(':');
        const column = separatorIdx < 3 ? "all" : arg.substr(0, separatorIdx) as FilterColumn;
        this.filter$.next({
            column: this.filterTypes.indexOf(column) == -1 ? "all" : column,
            value: arg.substr(separatorIdx, arg.length)
        });
    }

    private dateColumnSorting(list: Todos, asc: boolean) {
        list.sort((t1, t2) => {
            const r = isBefore(t1.createdAt, t2.createdAt) ? 1 : -1;
            return asc ? r : -r;
        });
        return list;
    }

    private txtColumnSorting(list: Todos, asc: boolean) {
        list.sort((t1, t2) => {
            const r = t1.group > t2.group ? 1 : -1;
            return asc ? r : -r;
        });
        return list;
    }

    private booleanColumnSorting(list: Todos, asc: boolean) {
        list.sort((t1, t2) => {
            const r = (t1.completed && !t2.completed) || (t1.completed && t2.completed) || (!t1.completed && !t2.completed) ? 1 : -1;
            return asc ? r : -r;
        });
        return list;
    }

    private dateFilter(value: ITodo, filter: string) {
        try {
            const d = parse(filter, 'yyyy-MM-dd', new Date())
            return isSameDay(value.createdAt, d);
        }
        catch(error) {
            return false;
        }
    }

    private groupFilter = (value: ITodo, filter: string) => value.group.indexOf(filter) > -1;
    private valueFilter = (value: ITodo, filter: string) => value.value.indexOf(filter) > -1;
}