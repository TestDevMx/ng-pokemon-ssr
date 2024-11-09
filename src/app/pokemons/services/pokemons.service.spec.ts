import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import type { PokeAPIResponse, SimplePokemon } from "../interfaces";
import { catchError } from "rxjs";

const mockPokeApiResponse: PokeAPIResponse = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10",
  "previous": '',
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
  ]
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mokPokemon = {
  id: 1, name: 'bulbasaur'
};


describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should load a page of SimplePokemons', () => {

    service.loadPage(1).subscribe(pokemon => {
      expect(pokemon).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);

  });

  it('should load page 5 of of SimplePokemons', () => {
    service.loadPage(5).subscribe(pokemon => {
      expect(pokemon).toEqual(expectedPokemons);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);

  });


  it('should load a Pokemon by ID', () => {
    const pokemonId = '1';
    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mokPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mokPokemon);
  });


  it('should load a Pokemon by Name', () => {
    const pokemonName = 'buibasaur';
    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mokPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mokPokemon);
  });


  //errores
  it('should catch error if pokemon not found', () => {
    const pokemonName = 'fake-pokemon';
    service.loadPokemon(pokemonName)
      .pipe(catchError(err => {
        expect(err.message).toContain('Pokemon not found')
        return [];
      }))
      .subscribe((pokemon: any) => {
        expect(pokemon).toEqual(mokPokemon);
      });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not found'
    });
  });

});