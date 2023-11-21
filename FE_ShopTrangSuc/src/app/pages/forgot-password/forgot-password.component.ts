
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  ForgotPassword!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.ForgotPassword = this.fb.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onHandleSubmit() {
    if (this.ForgotPassword.invalid) return;
    this.authService.resetpassword(this.ForgotPassword.value).subscribe({
      next: (user) => {
        this.toast.success({ detail: "Thông báo", summary: 'Đặt lại mật khẩu thành công!', duration: 5000, position: "topRight" });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toast.error({ detail: "Thông báo", summary: 'Đặt lại mật khẩu thất bại!', duration: 5000, position: "topRight" });
      }
    });
  }
}