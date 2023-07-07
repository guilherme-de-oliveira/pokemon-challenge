export interface Sprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    'official-artwork': {
      front_default: string;
    };
    dream_world: {
      front_default: string;
    };
  },
  version: any[];
}
