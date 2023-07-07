import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PokemonsState} from './reducers/pokemon.reducers';

import * as fromPokemons from './reducers/pokemon.reducers';


export const selectPokemonsState =
    createFeatureSelector<PokemonsState>("pokemons");



export const selectAllPokemons = createSelector(
    selectPokemonsState,
    fromPokemons.selectAll
);

export const selectPokemons = createSelector(
    selectAllPokemons,
    pokemons => pokemons
);

export const selectFavoritePokemons = createSelector(
    selectAllPokemons,
    pokemons => pokemons.filter(pokemon => pokemon.favorite)
);


export const arePokemonsLoaded = createSelector(
    selectPokemonsState,
    state => state.allPokemonsLoaded
);
