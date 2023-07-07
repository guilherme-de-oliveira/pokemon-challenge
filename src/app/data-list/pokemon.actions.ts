import {createAction, props} from '@ngrx/store';
import { Pokemon } from '../shared/pokemon.model';
import {Update} from '@ngrx/entity';

export const loadAllPokemons = createAction(
    "[Pokemons Resolver] Load All Pokemons"
);


export const allPokemonsLoaded = createAction(
    "[Load Pokemons Effect] All Pokemons Loaded",
    props<{pokemons: Pokemon[]}>()
);


export const pokemonUpdated = createAction(
  "[Edit Pokemon Dialog] Pokemon Updated",
  props<{update: Update<Pokemon>}>()
);

