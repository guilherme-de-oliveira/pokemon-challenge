import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {loadAllPokemons} from './pokemon.actions';
import {arePokemonsLoaded} from './pokemons.selectors';


@Injectable()
export class PokemonsResolver{
    loading = false;

    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(arePokemonsLoaded),
                tap(pokemonsLoaded => {
                    if (!this.loading && !pokemonsLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllPokemons());
                    }
                }),
                filter(pokemonsLoaded => pokemonsLoaded),
                first(),
                finalize(() => this.loading = false)
            );
    }

}
