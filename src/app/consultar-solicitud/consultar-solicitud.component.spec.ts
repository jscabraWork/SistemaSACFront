import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSolicitudComponent } from './consultar-solicitud.component';

describe('ConsultarSolicitudComponent', () => {
  let component: ConsultarSolicitudComponent;
  let fixture: ComponentFixture<ConsultarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarSolicitudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
