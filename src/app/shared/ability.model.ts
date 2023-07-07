import { AbilityName } from './ability-name.model';

export interface Ability {
  ability: AbilityName;
  is_hidden: boolean;
  slot: number;
}
