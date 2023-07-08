import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonDetails } from '../models/pokemon-details.model';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  subject = new Subject();
  
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

  searchPokemon(pokemons: Pokemon[], searchText: string) {
    return pokemons.filter((pokemon) => pokemon.name.includes(searchText));
  }

  filterFavorites(pokemons: Pokemon[]) {
    return pokemons.filter((pokemon) => pokemon.favorite);
  }

  searchOnFavorites(pokemons: Pokemon[], searchText: string) {
    const favorites = this.filterFavorites(pokemons);
    return favorites.filter((pokemon) => pokemon.name.includes(searchText));
  }

  getDetails(id: number) {
    return this.http.get<PokemonDetails>(`${API_URL}/${id}`);
  }
}
