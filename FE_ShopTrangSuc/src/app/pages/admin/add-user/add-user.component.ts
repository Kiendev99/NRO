import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  users: any = {};
  userForm = this.formBuider.group({
    firstname:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)]
    ],
    lastname:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)]
    ],
    email:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)]
    ],
    mobile:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)]
    ],
    password:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)]
    ]
  })
  constructor(private UserService: UserService, private router: Router, private formBuider: FormBuilder, private toast:NgToastService) {}
  onsubmit() {
    this.UserService.addUser(this.users).subscribe((response) => {
      console.log('danh tai khoan thanh cong: ',response);
      this.toast.success({ detail: "Thông báo", summary: 'Thêm user thành công!', duration: 5000, position: "topRight" });
      this.router.navigate(['/admin/listUser'])
      
      // Thực hiện các hành động sau khi sản phẩm được thêm thành công
    },
    error => {
      this.toast.error({ detail: "Thông báo", summary: 'Lỗi khi thêm User!', duration: 5000, position: "topRight" });
      console.log("loi khi them tai khoan: ", error);
      // Xử lý lỗi nếu có
    }
    );
  }
}
