import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent {
  users: any = []
  constructor(private userService: UserService, private router: Router, private toast:NgToastService) {
    this.userService.getUsers().subscribe(
      (response:any) => {
        this.users = response.users;
        console.log(this.users);
        
      },
      (error) => {
        console.log(error);
      }
    );

   

  }
 //deleteUser
 deleteUser(_id:any){
  var result = confirm("Bạn có muốn xóa không?");
  if (result) {
    // Người dùng đã chọn Đồng ý
    console.log("Người dùng đã chọn xóa.");
    // Gọi hàm xóa hoặc thực hiện các hành động khác tùy ý
    this.userService.deleteUser(_id).subscribe(
      response => {
        this.toast.error({ detail: "Thông báo", summary: 'xóa thành công!', duration: 5000, position: "topRight" });
        this.router.navigate(['/admin/listUser']);
        // Thực hiện các hành động sau khi sản phẩm được xóa thành công
      },
      error => {
        console.error('Lỗi khi xóa tai khoan:', error);
        // Xử lý lỗi nếu có
      }
    )
  } else {
    // Người dùng đã chọn Hủy
    alert("Người dùng đã chọn không xóa.");
    // Thực hiện các hành động khác tùy ý
  }
}
  
  
}
