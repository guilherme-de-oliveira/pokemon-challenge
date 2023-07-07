import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {

}

export const reducer: ActionReducerMap<AppState> = {
    router: routerReducer
};

export function logger(reducer:ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);

        return reducer(state, action);
    }

}


// export const metaReducer: MetaReducer<AppState>[] =
//     !environment.production ? [logger] : [];


    // const reducers: ActionReducerMap<IState> = {todos, visibilityFilter};

    export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
      return localStorageSync({keys: ['todos']})(reducer);
    }
    export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];