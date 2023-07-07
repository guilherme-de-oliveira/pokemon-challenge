import { Pokemon } from 'src/app/shared/pokemon.model';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {PokemonActions} from '../action-types';

console.log('reducerr')
export interface PokemonsState extends EntityState<Pokemon> {
    allPokemonsLoaded: boolean
}

// export interface test {
//     pokemons: Pokemon[],
//     error: string |null
// }

export const adapter = createEntityAdapter<Pokemon>({
    selectId: pokemon => pokemon.url
});

export const initialPokemonsState = adapter.getInitialState({
    allPokemonsLoaded:false
});

// export const initialPokemonsState: test = {
//     pokemons: [],
//     error: null
// };


export const pokemonsReducer = createReducer(

    initialPokemonsState,

    on(PokemonActions.allPokemonsLoaded,
        (state, action) => adapter.setAll(
            action.pokemons,
            {...state,
                allPokemonsLoaded:true
            })),


    on(PokemonActions.pokemonUpdated, (state, action) =>
        adapter.updateOne(action.update, state) )

);


export const {
    selectAll
} = adapter.getSelectors();

