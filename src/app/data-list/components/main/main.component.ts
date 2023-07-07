import { Component, OnInit } from '@angular/core';
import { selectAllPokemons, selectFavoritePokemons, selectPokemons } from '../../pokemons.selectors';
import { Pokemon } from 'src/app/shared/pokemon.model';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  pokemons$!: Observable<Pokemon[]>;
  display = "none";
  constructor(

    private store: Store<AppState>,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.pokemons$ = this.store.pipe(select(selectPokemons));
  }

  searchPokemon(query: any) {
    // const searchText = query.target.value;
    // console.log(searchText);
    // this.mainService.searchPokemon(searchText);
  }

  filterByFavorite() {
    // this.beginnerCourses$ = this.store.pipe(select(selectFavoritePokemons));
  }
  
  openModal(modal: any) {
    this.modalService.open(modal);
  }
}
