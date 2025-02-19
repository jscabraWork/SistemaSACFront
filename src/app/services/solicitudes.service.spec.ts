import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // Reemplazo de HttpClientModule
import { SolicitudesService } from './solicitudes.service';

describe('SolicitudesService', () => {
  let service: SolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] // Usar provideHttpClient() en lugar de HttpClientModule
    });
    service = TestBed.inject(SolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
