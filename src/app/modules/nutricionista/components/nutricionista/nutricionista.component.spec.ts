import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionistaComponent } from './nutricionista.component';

describe('NutricionistaComponent', () => {
  let component: NutricionistaComponent;
  let fixture: ComponentFixture<NutricionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutricionistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
