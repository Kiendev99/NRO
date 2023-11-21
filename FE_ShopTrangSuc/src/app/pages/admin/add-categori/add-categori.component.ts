import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-categori',
  templateUrl: './add-categori.component.html',
  styleUrls: ['./add-categori.component.scss']
})
export class AddCategoriComponent {
  categories: any = {};
  categoryForm = this.formBuider.group({
    title:[
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
    ]
  })
  constructor(private categoryService: CategoryService, private router: Router, private formBuider: FormBuilder,  private toast:NgToastService,) {}
  onsubmit() {
    this.categoryService.addCategory(this.categories).subscribe((response) => {
      this.toast.success({ detail: "Thông báo", summary: 'add thành công!', duration: 5000, position: "topRight" });
      this.router.navigate(['/admin/listCategori'])
     
      // Thực hiện các hành động sau khi sản phẩm được thêm thành công
    },
    error => {
      console.log("loi khi them danh muc: ", error);
      // Xử lý lỗi nếu có
    }
    );
  }
  
}
