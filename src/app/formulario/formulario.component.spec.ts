import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/solicitudes.service';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let solicitudesService: jasmine.SpyObj<SolicitudesService>;

  beforeEach(async () => {
    // Creamos un mock del servicio con jasmine
    const mockSolicitudesService = jasmine.createSpyObj('SolicitudesService', ['crearSolicitud']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, FormularioComponent], // Se importa correctamente FormsModule
      providers: [
        { provide: SolicitudesService, useValue: mockSolicitudesService }, // Se inyecta el mock del servicio
        provideHttpClient(),
      ],
    }).compileComponents();

    solicitudesService = TestBed.inject(SolicitudesService) as jasmine.SpyObj<SolicitudesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an instance of SolicitudesService', () => {
    expect(solicitudesService).toBeTruthy();
  });

  it('should call crearSolicitud and show success alert on success', () => {
    // Simulamos respuesta exitosa del servicio
    const mockResponse = { numero: 123 };
    solicitudesService.crearSolicitud.and.returnValue(of(mockResponse));

    spyOn(window, 'alert'); // Evitamos que realmente se muestre el alert

    component.solicitud.so_ts_id = 1;
    component.solicitud.so_descripcion = 'Test solicitud';

    component.crearSolicitud(); // Ejecutamos la función

    expect(solicitudesService.crearSolicitud).toHaveBeenCalledWith(component.solicitud);
    expect(window.alert).toHaveBeenCalledWith('Solicitud 123 creada con éxito');
  });

  it('should call crearSolicitud and show error alert on failure', () => {
    // Simulamos un error del servicio
    solicitudesService.crearSolicitud.and.returnValue(throwError(() => new Error('Error en la solicitud')));

    spyOn(window, 'alert'); // Evitamos que realmente se muestre el alert

    component.crearSolicitud(); // Ejecutamos la función

    expect(solicitudesService.crearSolicitud).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Sucedió un error al crear la solicitud');
  });
});
