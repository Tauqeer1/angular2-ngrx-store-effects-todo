import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import '@ngrx/core/operator/select';

import { TodoService, ITodo } from '../../services';
import { TodoActions, TodoState } from '../../stores/todo';

@Component({
  selector: 'todos',
  template: require('./todos.html'),
  styles: [require('./todos.scss')]
})
export class TodosComponent {

  todos: Observable<ITodo[]>

  constructor(private ts: TodoService, private ta: TodoActions, private store: Store<ITodo[]>) {
    // this.todos = this.ts.todos;
    this.todos = this.store.select<ITodo[]>('todos');
    this.store.dispatch(this.ta.load());
  }

  add(todo: string) {
    // this.ts.add(todo);
    let action = this.ta.add({ title: todo, completed: true });
    this.store.dispatch(action);
  }

}