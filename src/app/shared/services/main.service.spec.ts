import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

const pokemons: Pokemon[] = [
  {
    name: "bulbasaur",
    id: 1,
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    favorite: false,
    comments: 'the goat'
  },
];
describe('MainService', () => {
  
  let service: MainService;
  let httpClientSpy: any;
  const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=1281';

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    }
    service = new MainService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllPokemons function, which brings all Pokemons from API.', () => {
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(pokemons));
    service.getAllPokemons();

    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL);
  });
});
