import { TypeName } from './type-name.model';

export interface Type {
  type: TypeName;
  is_hidden: boolean;
  slot: number;
}
