import { Component, Input, OnInit, Output } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Pokemon } from 'src/app/shared/pokemon.model';
import { pokemonUpdated } from '../../pokemon.actions';
import { Observable } from 'rxjs';
import { selectPokemons } from '../../pokemons.selectors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  pokemons$!: Observable<Pokemon[]>;
  
  constructor(    private store: Store<AppState>) {}
  ngOnInit() {
    // this.pokemons$ = this.store.pipe(select(selectPokemons));
    // let favorite;
    // this.pokemons$.subscribe(pokemon => {
    //   favorite = console.log(pokemon[this.pokemon.id].favorite)
    // })
    // this.applyFavoriteClass(favorite);
  }
  
  getImageUrl(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  toggleFavorite() {
    const pokemon = {...this.pokemon}
    // pokemon.favorite = this.favorite;
    pokemon.favorite = !this.pokemon.favorite;

    // dispatcher
    const update: Update<Pokemon> = {
      id: pokemon.id,
      changes: pokemon
    }
    
    this.store.dispatch(pokemonUpdated({update}));
  }
}
