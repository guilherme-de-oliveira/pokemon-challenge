import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Pokemon } from 'src/app/shared/pokemon.model';
import { selectPokemons } from '../../pokemons.selectors';
import { Update } from '@ngrx/entity';
import { pokemonUpdated } from '../../pokemon.actions';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  pokemon!: Pokemon;
  pokemonId: number = 0;
  comments: string = '';
  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: NgbModal
  ){}
  ngOnInit() {
    const routeId = this.router.url.match(/\d+/g);

    if (routeId !== null) {
      this.pokemonId = Number(routeId[0]);
    }

    this.pokemons$ = this.store.pipe(select(selectPokemons));

    this.getPokemon()
  }

  getPokemon() {
    this.pokemons$.subscribe(pokemons => {
      this.pokemon = pokemons[this.pokemonId - 1]
      this.comments = this.pokemon.comments;
      
      console.log(this.comments)
    });
  }

  save(comment: string) {
    const pokemon = {...this.pokemon}
    console.log(comment)
    pokemon.comments = comment;
    
    const update: Update<Pokemon> = {
      id: pokemon.id,
      changes: pokemon
    }
    
    console.log(pokemon)
    this.store.dispatch(pokemonUpdated({update}));

    // Close Modal
    this.modalService.dismissAll();
  }

  removeComment(id: number) {
    this.comments = '';
    this.save('');
  }

}
