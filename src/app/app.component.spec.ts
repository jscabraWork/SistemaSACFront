import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Se importa directamente porque es standalone
      providers: [
        provideRouter([]), // Se provee un router vacío para evitar errores con RouterOutlet
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: (key: string) => 'test-param' }) }, // Mock de ActivatedRoute
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
