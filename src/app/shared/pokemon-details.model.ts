import { Api } from './api.model';
import { Ability } from './ability.model'
import { Sprite } from './sprite.model';
import { Type } from './type.model';

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  forms: Api;
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  species: Api;
  sprites: Sprite;
  stats: any[];
  type_1: string;
  type_2: string;
  weight: number;
  image?: string;
  url: string;
  types: Type[]
}
