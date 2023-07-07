import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PokemonActions} from './action-types';
import { MainService } from '../shared/services/main.service';
import {concatMap, map} from 'rxjs/operators';
import {allPokemonsLoaded} from './pokemon.actions';


@Injectable()
export class PokemonsEffects {

    loadPokemons$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(PokemonActions.loadAllPokemons),
                concatMap(action =>
                    this.mainService.getAllPokemons()),
                map(pokemons => allPokemonsLoaded({pokemons}))
            )
    );

    savePokemon$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(PokemonActions.pokemonUpdated)
            ),
        {dispatch: false}
    );

    constructor(private actions$: Actions,
                private mainService: MainService) {

    }

}
