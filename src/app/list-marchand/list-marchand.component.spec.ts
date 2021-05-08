import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarchandComponent } from './list-marchand.component';

describe('ListMarchandComponent', () => {
  let component: ListMarchandComponent;
  let fixture: ComponentFixture<ListMarchandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMarchandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarchandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
