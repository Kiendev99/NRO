import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriComponent } from './list-categori.component';

describe('ListCategoriComponent', () => {
  let component: ListCategoriComponent;
  let fixture: ComponentFixture<ListCategoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategoriComponent]
    });
    fixture = TestBed.createComponent(ListCategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
