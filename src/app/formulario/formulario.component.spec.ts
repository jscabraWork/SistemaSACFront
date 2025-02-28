import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/solicitudes.service';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { SolicitudCreacion } from '../models/creaciones.model';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let solicitudesService: jasmine.SpyObj<SolicitudesService>;

  beforeEach(async () => {
    const mockSolicitudesService = jasmine.createSpyObj('SolicitudesService', ['crearSolicitud']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, FormularioComponent],
      providers: [
        { provide: SolicitudesService, useValue: mockSolicitudesService },
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


  it('should call crearSolicitud without files and show success alert', () => {
    const mockResponse = { so_numero_solicitud: 123 };
    solicitudesService.crearSolicitud.and.returnValue(of(mockResponse));
  
    spyOn(window, 'alert');
  
    // Aseguramos que los valores coincidan con la expectativa
    component.solicitud = new SolicitudCreacion();
    component.solicitud.so_descripcion = 'Test solicitud'; // Ahora coincide con la expectativa real
    component.solicitud.so_es_id = 2; // Ahora coincide con la expectativa real
  
    component.crearSolicitud();
  
    expect(solicitudesService.crearSolicitud.calls.mostRecent().args[0].so_descripcion).toBe('Test solicitud');
    expect(solicitudesService.crearSolicitud.calls.mostRecent().args[0].so_es_id).toBe(2);
    expect(window.alert).toHaveBeenCalledWith('Solicitud 123 creada con éxito');
    expect(component.creando).toBeFalse();
  });
  

  it('should call crearSolicitud with files and show success alert', () => {
    const mockResponse = { so_numero_solicitud: 456 };
    solicitudesService.crearSolicitud.and.returnValue(of(mockResponse));

    spyOn(window, 'alert');

    // Simulamos que hay archivos seleccionados
    component.imagesSrc.push('archivo1.png');
    const file = new File(['test'], 'archivo1.png', { type: 'image/png' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    component.selectedFiles = dataTransfer.files;

    component.crearSolicitud();

    expect(solicitudesService.crearSolicitud).toHaveBeenCalledWith(component.solicitud, component.selectedFiles);
    expect(window.alert).toHaveBeenCalledWith('Solicitud 456 creada con éxito');
    expect(component.creando).toBeFalse();
  });




  

  it('should update selectedFiles when selectFiles is called', () => {
    const file = new File(['test'], 'archivo.png', { type: 'image/png' });
    const event = { target: { files: [file] } };

    component.selectFiles(event as any);

    expect(component.selectedFiles.length).toBe(1);
    expect(component.selectedFileName).toBe('archivo.png');
  });

  it('should generate random letters', () => {
    const letters = component.generarLetrasAleatorias();
    expect(letters.length).toBe(5);
    expect(/[A-Z]{5}/.test(letters)).toBeTrue();
  });
});
