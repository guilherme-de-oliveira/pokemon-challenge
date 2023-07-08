import { Component, Input } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { pokemonUpdated } from '../../pokemon.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  pokemons$!: Observable<Pokemon[]>;
  
  constructor(private store: Store<AppState>) {}

  getImageUrl(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  toggleFavorite() {
    const pokemon = {...this.pokemon}
    pokemon.favorite = !this.pokemon.favorite;

    const update: Update<Pokemon> = {
      id: pokemon.id,
      changes: pokemon
    }
    
    this.store.dispatch(pokemonUpdated({update}));
  }
}
