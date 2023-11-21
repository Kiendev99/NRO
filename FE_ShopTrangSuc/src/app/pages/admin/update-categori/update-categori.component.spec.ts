import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoriComponent } from './update-categori.component';

describe('UpdateCategoriComponent', () => {
  let component: UpdateCategoriComponent;
  let fixture: ComponentFixture<UpdateCategoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCategoriComponent]
    });
    fixture = TestBed.createComponent(UpdateCategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
