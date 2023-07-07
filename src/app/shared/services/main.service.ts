import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatAll, concatMap, debounceTime, map, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from 'src/app/shared/api-response.model';
import { Pokemon } from 'src/app/shared/pokemon.model';
import { PokemonDetails } from '../pokemon-details.model';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  subject = new Subject();
  pokemons$?: Observable<string[]>
  
  constructor(private http: HttpClient) {
  }

  getAllPokemons(): Observable<Pokemon[]> {
    console.log('getAll')
    return this.http.get<ApiResponse>(`${API_URL}/?limit=1281`)
      .pipe(
        map(response => response['results']),
        tap(data => {
          this.setDefaultInfo(data);

          return [data];
        })
      );
  }

  setDefaultInfo(pokemons: Pokemon[]) {
    pokemons.forEach(pokemon => {
      const indexAux = pokemon.url.lastIndexOf('/', pokemon.url.lastIndexOf('/') - 1);
      let idx = pokemon.url.slice(indexAux);
      idx = idx.replaceAll('/', '')
      
      pokemon.id = Number(idx);
      pokemon.favorite = false;
      pokemon.comments = '';
    })
  }

  searchPokemon(pokemons, searchText) {
    return pokemons.filter((pokemon) => pokemon.name.includes(searchText));
  }

  filterFavorites(pokemons) {
    return pokemons.filter((pokemon) => pokemon.favorite);
  }

  searchOnFavorites(pokemons, searchText) {
    const favorites = this.filterFavorites(pokemons);
    return favorites.filter((pokemon) => pokemon.name.includes(searchText));
  }

  getDetails(id: number) {
    console.log('opa', id);
    console.log(`${API_URL}/${id}`)
    return this.http.get<PokemonDetails>(`${API_URL}/${id}`);
  }
}
