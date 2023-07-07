import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/shared/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  getImageUrl(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }
  addComment(id: number) {
    console.log(id)
  }

  removeComment(id: number) {
    console.log(id)
  }

  toggleFavorite(id: number) {
    console.log(id)
  }

  goToDetails(id: number) {
    console.log(id)
  }
}
