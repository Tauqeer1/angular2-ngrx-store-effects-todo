import {Injectable} from '@angular/core';
import {Store, ActionReducer, Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/rx';

import {HttpService} from '../services';

export interface ITodo {
  id?: number,
  title: string,
  completed: boolean
}

export interface TodoState {
  todos: ITodo[],
  // isBusy: boolean
}

@Injectable()
export class TodoActions {

  static LOAD = 'LOAD';
  load(): Action {
    return {
      type: TodoActions.LOAD
    }
  }

  static ADD = 'ADD';
  add(obj: ITodo): Action {
    return {
      type: TodoActions.ADD,
      payload: obj
    }
  }

  static UPDATE = 'UPDATE';
  update(obj: ITodo): Action {
    return {
      type: TodoActions.UPDATE,
      payload: obj
    }
  }

  static DELETE = 'DELETE';
  delete(obj: ITodo): Action {
    return {
      type: TodoActions.DELETE,
      payload: obj
    }
  }

  static LOAD_SUCCESS = 'LOAD_SUCCESS';
  loadSuccess(obj: ITodo[]): Action {
    return {
      type: TodoActions.LOAD_SUCCESS,
      payload: obj
    }
  }

  static ADD_SUCCESS = 'ADD_SUCCESS';
  addSuccess(obj: ITodo): Action {
    return {
      type: TodoActions.ADD_SUCCESS,
      payload: obj
    }
  }

  static UPDATE_SUCCESS = 'UPDATE_SUCCESS';
  UpdateSuccess(obj: ITodo): Action {
    return {
      type: TodoActions.UPDATE_SUCCESS,
      payload: obj
    }
  }

  static DELETE_SUCCESS = 'DELETE_SUCCESS';
  deleteSuccess(id: string): Action {
    return {
      type: TodoActions.DELETE_SUCCESS,
      payload: id
    }
  }

  static FAIL = 'FAIL';
  fail(error: string): Observable<Action> {
    return Observable.of({
      type: TodoActions.FAIL,
      payload: error
    })
  }

}

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions, private hs: HttpService, private ta: TodoActions) { }

  @Effect() load$ = this.actions$
    // Listen for the 'LOGIN' action
    .ofType(TodoActions.LOAD)
    .switchMap(() => this.hs.GetRequest(HttpService.api)
      // If successful, dispatch success action with result
      .map(res => this.ta.loadSuccess(res.json()))
      // If request fails, dispatch failed action
      .catch((err) => this.ta.fail(err))
  );
  
  @Effect() add$ = this.actions$
    // Listen for the 'LOGIN' action
    .ofType(TodoActions.ADD)
    // Map the payload into JSON to use as the request body
    // .map(action => { console.log(action.payload); return JSON.stringify(action.payload); })
    // .switchMap(payload => this.hs.PostRequest(HttpService.api, payload)
    .switchMap(action => this.hs.PostRequest(HttpService.api, action.payload)
      // If successful, dispatch success action with result
      .map(res => this.ta.addSuccess(res.json()))
      // If request fails, dispatch failed action
      .catch((err) => this.ta.fail(err))
    );

}

// const initialState: TodoState = {  
//     todos: [],
//     isBusy: false
// };

export const TodoReducer: ActionReducer<ITodo[]> = (state: ITodo[] = [], action: Action): ITodo[] => {
  switch (action.type) {
    case TodoActions.LOAD_SUCCESS:
      return action.payload;
    case TodoActions.ADD_SUCCESS:
      return [...state, Object.assign({}, action.payload)];
    case TodoActions.UPDATE_SUCCESS:
      return state.map(todo => {
        return todo.id === action.payload.id ? Object.assign({}, todo, action.payload) : todo;
      })
    case TodoActions.DELETE_SUCCESS:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  };
}

