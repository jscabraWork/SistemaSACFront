import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderSolicitudComponent } from './responder-solicitud.component';

describe('ResponderSolicitudComponent', () => {
  let component: ResponderSolicitudComponent;
  let fixture: ComponentFixture<ResponderSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderSolicitudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
