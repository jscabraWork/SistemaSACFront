import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarSolicitudComponent } from './consultar-solicitud.component';
import { SolicitudesService } from '../services/solicitudes.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { Solicitud } from '../models/solicitud.model';

describe('ConsultarSolicitudComponent', () => {
  let component: ConsultarSolicitudComponent;
  let fixture: ComponentFixture<ConsultarSolicitudComponent>;
  let solicitudesService: jasmine.SpyObj<SolicitudesService>;

  beforeEach(async () => {
    // Creamos un mock del servicio con jasmine
    const mockSolicitudesService = jasmine.createSpyObj('SolicitudesService', ['getSolicitudPorRadicado','getSolicitudesPorEmail']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ConsultarSolicitudComponent], // Se importa correctamente FormsModule
      providers: [
        { provide: SolicitudesService, useValue: mockSolicitudesService }, // Se inyecta el mock del servicio
        provideHttpClient(),
      ],
    }).compileComponents();

    solicitudesService = TestBed.inject(SolicitudesService) as jasmine.SpyObj<SolicitudesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should reset values on reiniciar()', () => {
    component.noRadico = '1234';
    component.correo = 'test@example.com';
    component.solicitudes = [{ so_id: 1 } as any];
    component.reiniciar();
    expect(component.noRadico).toBe('');
    expect(component.correo).toBe('');
    expect(component.solicitudes.length).toBe(0);
  });

 it('should search by radicado', () => {
  const mockResponse: Solicitud[] = [{
    so_id: 1,
    so_numero_solicitud: '1234',
    so_ts_id: 1,
    so_descripcion: 'Descripción de prueba',
    so_fecha_creacion: new Date(),
    so_es_id: 2,
    so_us_id: 3,
    usuarios: {
      us_id: 3,
      us_nombre: 'Juan',
      us_apellido: 'Pérez',
      us_ti_id: 1,
      us_identificacion: '123456789',
      us_telefono: '1234567890',
      us_correo: 'juan@example.com',
      tipo_Identificacion: {
        ti_id: 1,
        ti_descripcion: 'Cédula'
      }
    },
    tipos_Solicitudes: {
      ts_id: 1,
      ts_nombre: 'Reclamo',
      ts_descripcion: 'Queja sobre servicio',
      ts_prioridad: 2
    },
    estados_Solicitudes: {
      es_id: 2,
      es_nombre_estado: 'Pendiente'
    }
  }];

  solicitudesService.getSolicitudPorRadicado.and.returnValue(of(mockResponse));

  component.tipoBusqueda = 0;
  component.noRadico = '1234';
  component.buscarSolicitud();

  expect(solicitudesService.getSolicitudPorRadicado).toHaveBeenCalledWith('1234');
  expect(component.solicitudes).toEqual(mockResponse);
});

it('should search by radicado', () => {
  const mockResponse: Solicitud[] = [{
    so_id: 1,
    so_numero_solicitud: '1234',
    so_ts_id: 1,
    so_descripcion: 'Descripción de prueba',
    so_fecha_creacion: new Date(),
    so_es_id: 2,
    so_us_id: 3,
    usuarios: {
      us_id: 3,
      us_nombre: 'Juan',
      us_apellido: 'Pérez',
      us_ti_id: 1,
      us_identificacion: '123456789',
      us_telefono: '1234567890',
      us_correo: 'juan@example.com',
      tipo_Identificacion: {
        ti_id: 1,
        ti_descripcion: 'Cédula'
      }
    },
    tipos_Solicitudes: {
      ts_id: 1,
      ts_nombre: 'Reclamo',
      ts_descripcion: 'Queja sobre servicio',
      ts_prioridad: 2
    },
    estados_Solicitudes: {
      es_id: 2,
      es_nombre_estado: 'Pendiente'
    }
  }];

  // Mockear el servicio
  solicitudesService.getSolicitudPorRadicado.and.returnValue(of(mockResponse));

  component.tipoBusqueda = 0;
  component.noRadico = '1234';
  component.buscarSolicitud();

  expect(solicitudesService.getSolicitudPorRadicado).toHaveBeenCalledWith('1234');
  expect(component.solicitudes).toEqual(mockResponse);
});


  it('should show error alert on search failure', () => {
    spyOn(window, 'alert');
    solicitudesService.getSolicitudPorRadicado.and.returnValue(throwError(() => new Error('Error')));
    component.tipoBusqueda = 0;
    component.noRadico = '1234';
    component.buscarSolicitud();
    expect(window.alert).toHaveBeenCalledWith('Sucedio un error, por favor vuelva a intentar');
  });

  it('should disable search if already searching', () => {
    spyOn(window, 'alert');
    component.buscando = true;
    component.buscarSolicitud();
    expect(window.alert).toHaveBeenCalledWith('Buscando...');
  });

  it('should update tipoBusqueda when dropdown changes', () => {
    const select = fixture.debugElement.query(By.css('#tipoB')).nativeElement;
    select.value = '0';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    
    expect(component.tipoBusqueda).toBe(select.value); // Convertir '0' a número
  });
  
});
