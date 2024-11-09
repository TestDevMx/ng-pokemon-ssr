import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<h1>testing</h1>`
  })
  class NavBarComponentMock { }

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavBarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    });

    /*Opcion 1 para probar solo el componente (recomendado)
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ]
    }).overrideComponent(AppComponent, {
      add: {
        imports: [NavBarComponentMock]
      },
      remove: {
        imports: [NavbarComponent]
      }
    }).compileComponents();
    */

    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavBarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    });

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // console.log(fixture.nativeElement)
    // expect(true).toBeFalsy();
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    // console.log(compiled);

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();

  });

  //   it('should render title', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     fixture.detectChanges();
  //     const compiled = fixture.nativeElement as HTMLElement;
  //     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  //   });
});
