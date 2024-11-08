import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, signal, type OnDestroy, type OnInit } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import type { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonPageComponent implements OnInit, OnDestroy {

  // public currentName = signal('Name');

  public pokemons = signal<SimplePokemon[]>([]);
  private pokemonsSrv = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => isNaN(+page) ? 1 : +page),
      map(page => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true
  });


  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable
  //   .subscribe(isStable => {
  //     console.log({ isStable })
  //   });

  ngOnInit(): void {
    // setTimeout(() => this.isLoading.set(false), 5000);
    // console.log(this.currentPage());
    // this.loadPokemons();
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page = 0) {
    // const pageToLoad = this.currentPage()! + page;
    this.pokemonsSrv.loadPage(page)
      .pipe(
        // tap(_ => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(_ => this.title.setTitle(`Pokémon SSR - Page ${page}`)))
      .subscribe(pokemon => {
        this.pokemons.set(pokemon);
      });
  }

}
