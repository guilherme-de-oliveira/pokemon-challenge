import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { EntityDataService } from '@ngrx/data';
import {EffectsModule} from '@ngrx/effects';

import { MainComponent } from './components/main/main.component';
// import { DetailsComponent } from './details/details/details.component';
import { CommentComponent } from './components/comment/comment.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { EntityMetadataMap } from '@ngrx/data';
import { MainService } from '../shared/services/main.service';
import {StoreModule} from '@ngrx/store';
import { pokemonsReducer } from './reducers/pokemon.reducers';
import { PokemonsEffects } from './pokemons.effects';
import { PokemonsResolver } from './pokemon.resolver';
import { ModalWrapperComponent } from '../details/modal-container.component';
import { DetailsComponent } from '../details/details/details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const entityMetaData: EntityMetadataMap = {
  Pokemon: {
    
  }
}


@NgModule({
  declarations: [
    CommentComponent,
    PokemonCardComponent,
    MainComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MainComponent, resolve: {pokemons: PokemonsResolver}, 
      // children: [{ path: 'details/:id', component: ModalWrapperComponent, data:{component:DetailsComponent}}]
      },
      // { path: 'details/:id', component:ModalWrapperComponent, data:{component:DetailsComponent}}
      { path: 'details/:id', loadChildren: () => import('../details/details.module').then(m => m.DetailsModule) },
  ], ),
    EffectsModule.forFeature([PokemonsEffects]),
    StoreModule.forFeature("pokemons", pokemonsReducer),
    NgbModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
    MainService,
    PokemonsResolver
  ]
})
export class DataListModule {

  constructor() {
  }
  
}
