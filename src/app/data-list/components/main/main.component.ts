import { Component, OnInit } from '@angular/core';
import { selectPokemons } from '../../pokemons.selectors';
import { Pokemon } from 'src/app/shared/pokemon.model';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  pokemons$!: Observable<Pokemon[]>;
  pokemons: Pokemon[];  
  pokemonsFilter: Pokemon[];
  onlyFavorite: boolean = false;

  constructor(
    private mainService: MainService,
    private store: Store<AppState>,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.pokemons$ = this.store.pipe(select(selectPokemons));
    
    this.pokemons$.subscribe(pokemons => {
      this.pokemonsFilter = pokemons;

      this.pokemons = (this.onlyFavorite)
        ? this.mainService.filterFavorites(this.pokemonsFilter)
        : this.pokemons = pokemons;
    });
  }

  filterPokemon(query: any) {
    const searchText = query.target.value;
    
    if (this.onlyFavorite) {
      this.pokemons = this.mainService.searchOnFavorites(this.pokemonsFilter, searchText)
    } else {
      this.pokemons = this.mainService.searchPokemon(this.pokemonsFilter, searchText);
    }
    
  }

  toggleFavorite() {
    this.onlyFavorite = !this.onlyFavorite;
    const btn = document.getElementById('filterByFavorite');
    btn.className  = (this.onlyFavorite) ? 'btn btn-outline-warning btn-lg active' : 'btn btn-outline-warning btn-lg';

    // Filter Items By Favorite
    if (this.onlyFavorite) {
      this.pokemons = this.mainService.filterFavorites(this.pokemonsFilter);
    } else {
      this.pokemons = this.pokemonsFilter;
    }
  }
  
  openModal(modal: any) {
    this.modalService.open(modal);
  }
}
