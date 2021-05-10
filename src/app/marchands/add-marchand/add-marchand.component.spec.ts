import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarchandComponent } from './add-marchand.component';

describe('AddMarchandComponent', () => {
  let component: AddMarchandComponent;
  let fixture: ComponentFixture<AddMarchandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMarchandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarchandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
