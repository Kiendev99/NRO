import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent {

  emailForm!: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router,) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendEmail() {
    if (this.emailForm.invalid) return;

    const recipientEmail = this.emailForm.value.email;

    this.authService.sendEmail(recipientEmail).subscribe({
      next: (user) => {
        this.toast.success({ detail: "Thông báo", summary: 'Gửi yêu cầu thành công!', duration: 5000, position: "topRight" });
        this.router.navigate(['/resetpassword'])
      },
      error: ({ error }) => {
        this.toast.error({ detail: "Thông báo", summary: 'Gửi yêu cầu thất bại!', duration: 5000, position: "topRight" });
      }
    }
    );
  }
}