import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforAccountComponent } from './infor-account.component';

describe('InforAccountComponent', () => {
  let component: InforAccountComponent;
  let fixture: ComponentFixture<InforAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InforAccountComponent]
    });
    fixture = TestBed.createComponent(InforAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
