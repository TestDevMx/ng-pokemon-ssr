import { TestBed, type ComponentFixture } from "@angular/core/testing";
import { PokemonListComponent } from "./pokemon-list.component";
import type { SimplePokemon } from "../../interfaces";
import { provideRouter } from "@angular/router";


const mockPokemon: SimplePokemon[] = [
  { id: '1', name: 'builbasaur' },
  { id: '2', name: 'ivysaur' },
];


describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with two app-pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemon);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('app-pokemon-card').length).toBe(mockPokemon.length);
  });


  it('should render "No hay pokémons" ', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent).toContain('No hay pokémons');
  });

});