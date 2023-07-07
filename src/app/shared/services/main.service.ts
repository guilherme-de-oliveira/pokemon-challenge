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
          this.getIdFromUrl(data)
          // let idx = new RegExp('^[0-9]*$', data.url)
          // data.id = 
          return data;
        })
        
        // map(pokemon => {
        //    this.http.get(`${pokemon.url}`).subscribe(data => pokemon)
          

        // })
        // concatMap(res => {
        //   const response = res['results'];
        //   this.http.get<Pokemon[]>(`${res.url}`)),
        // }


    );
  
  }

  getIdFromUrl(pokemons: Pokemon[]) {
    pokemons.forEach(pokemon => {
      console.log(pokemon.url)
      let indexAux = pokemon.url.lastIndexOf('/', pokemon.url.lastIndexOf('/') - 1);
      let idx = pokemon.url.slice(indexAux);
      idx = idx.replaceAll('/', '')
      console.log(idx)
      pokemon.id = Number(idx);
    })
  }

  searchPokemon(searchText: string) {
    console.log('service')
  }

  savePokemon(id: string | number, changes: Partial<Pokemon>) {
    return this.http.put('/api/course/' + id, changes);
  }

  getDetails(id: number) {
    console.log('opa', id);
    console.log(`${API_URL}/${id}`)
    return this.http.get<PokemonDetails>(`${API_URL}/${id}`);
  }
}
