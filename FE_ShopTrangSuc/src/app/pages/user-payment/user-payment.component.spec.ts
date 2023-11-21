import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentComponent } from './user-payment.component';

describe('UserPaymentComponent', () => {
  let component: UserPaymentComponent;
  let fixture: ComponentFixture<UserPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentComponent]
    });
    fixture = TestBed.createComponent(UserPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
