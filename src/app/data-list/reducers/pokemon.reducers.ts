import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { on } from '@ngrx/store';
import { PokemonActions } from '../action-types';
import { createRehydrateReducer } from './rehydratedReducer';

export interface PokemonsState extends EntityState<Pokemon> {
    allPokemonsLoaded: boolean
}

export const adapter = createEntityAdapter<Pokemon>({
    selectId: pokemon => pokemon.id
});

export const initialPokemonsState = adapter.getInitialState({
    allPokemonsLoaded:false
});

export const pokemonsReducer = createRehydrateReducer(
    'POKEMONS',
    initialPokemonsState,

    on(PokemonActions.allPokemonsLoaded, (state, action) => 
        adapter.setAll(
            action.pokemons,
            {...state,
                allPokemonsLoaded:true
            }
        )
    ),

    on(PokemonActions.pokemonUpdated, (state, action) => {    
        return adapter.updateOne(action.update, state) 
    }),
);

export const {
    selectAll
} = adapter.getSelectors();
