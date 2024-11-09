import { TestBed, type ComponentFixture } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { provideRouter } from "@angular/router";
import type { SimplePokemon } from "../../interfaces";


const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'builbasaur'
};

describe('PokemonCardComponent', () => {

    let fixture: ComponentFixture<PokemonCardComponent>;
    let compiled: HTMLElement;
    let component: PokemonCardComponent;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [PokemonCardComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon);

        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        // console.log(compiled)
        expect(component).toBeTruthy();
    });

    it('should have the SimplePokemon signal inputValue', () => { //TS
        expect(component.pokemon()).toEqual(mockPokemon);
    });


    it('should render the pokemon name and image correctly', () => { //HTML
        const image = compiled.querySelector('img')!;
        expect(image).toBeDefined();
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`
        expect(image.src).toBe(imageUrl);
        expect(compiled.textContent).toBe(mockPokemon.name);
    });


    it('should have de proper ng-reflect-router-link', () => { //HTML
        const divWithLink = compiled.querySelector('div');

        expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${mockPokemon.name}`);
    });

});