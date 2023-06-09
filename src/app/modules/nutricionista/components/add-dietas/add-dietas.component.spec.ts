import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDietaComponent } from './add-dietas.component';

describe('AddDietasComponent', () => {
  let component: AddDietaComponent;
  let fixture: ComponentFixture<AddDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDietaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
