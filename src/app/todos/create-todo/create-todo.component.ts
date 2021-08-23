import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select} from "@ngxs/store";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {debounceTime, filter, map} from "rxjs/operators";
import {TodosState} from "../state/todos.state";

@Component({
  selector: "app-create-todo",
  templateUrl: "./create-todo.component.html",
})
export class CreateTodoComponent implements OnInit {

  @Select(TodosState.groupList)
  private groupList$!: Observable<string[]>;
  private filterGroupSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  form!: FormGroup;
  displayGroups$!: Observable<boolean>;
  filterGroups$!: Observable<string[]>;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      completed: false,
      group: '',
      value: ['', Validators.required],
    });
    this.filterGroups$ = combineLatest([this.groupList$, this.filterGroupSubject$]).pipe(
      map(([groups, filter]) =>
        filter.length == 0 ? [] :
          groups
            .filter(x => x.length > 1)
            .filter((group) => group.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1)),
      debounceTime(250)
    );
    this.displayGroups$ = this.filterGroups$.pipe(
      map((groups) => groups.length > 0)
    );
  }

  groupFilterChange(filter: string) {
    this.filterGroupSubject$.next(filter == null ? '' : filter);
  }

  selectGroup(group: string) {
    this.form.get('group')?.setValue(group);
  }

  onSubmit() {
    const isComplete = this.form.get('completed') == null ? false : this.form.get('completed')?.value;
    if(this.form != null && this.form.valid)
      console.log(`${this.form.get('value')?.value} ${this.form.get('group')?.value} ${isComplete}`);
    this.form.reset();
  }
}
