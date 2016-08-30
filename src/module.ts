import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoot } from './component/app';
import { TodosComponent } from './component/todos';
import { TodoComponent } from './component/todo';
import { TodoService, HttpService } from './services';
import { ITodo, TodoActions, TodoReducer, TodoEffects } from './stores/todo';

@NgModule({
  imports: [BrowserModule, HttpModule, StoreModule.provideStore({ todos: TodoReducer }), EffectsModule.run(TodoEffects)],
  declarations: [AppRoot, TodosComponent, TodoComponent],
  providers: [TodoService, TodoActions, HttpService],
  bootstrap: [AppRoot]
})
export class AppModule { }