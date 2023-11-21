import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriComponent } from './add-categori.component';

describe('AddCategoriComponent', () => {
  let component: AddCategoriComponent;
  let fixture: ComponentFixture<AddCategoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoriComponent]
    });
    fixture = TestBed.createComponent(AddCategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
