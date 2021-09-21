import {Component, OnInit} from "@angular/core";
import { Store } from "@ngxs/store";
import { FetchTodos } from "../state/todos.actions";

@Component({
    selector: 'app-todos-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

    constructor(private store: Store) { }

    ngOnInit() { 
        this.store.dispatch(new FetchTodos());
    }
}