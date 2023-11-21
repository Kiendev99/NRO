import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list-categori',
  templateUrl: './list-categori.component.html',
  styleUrls: ['./list-categori.component.scss']
})
export class ListCategoriComponent {
  categories: any = []
  constructor(private categoryService: CategoryService, private router: Router, private toast:NgToastService) {
    this.categoryService.getCategories().subscribe(
      (response:any) => {
        this.categories = response.getAllCategory;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  //deleteCategory
  deleteCategory(id:any){
    var result = confirm("Bạn có muốn xóa không?");
    if (result) {
      // Người dùng đã chọn Đồng ý
      console.log("Người dùng đã chọn xóa.");
      // Gọi hàm xóa hoặc thực hiện các hành động khác tùy ý
      this.categoryService.deleteCategory(id).subscribe(
        response => {
          this.toast.success({ detail: "Thông báo", summary: 'xóa thành công!', duration: 5000, position: "topRight" });
          this.router.navigate(['/admin/listCategori']);
          
          
        },
        error => {
          this.toast.success({ detail: "Thông báo", summary: 'lỗi rồi !!', duration: 5000, position: "topRight" });
          console.error('Lỗi khi xóa sản phẩm:', error);
          
        }
      )
    } else {
      // Người dùng đã chọn Hủy
      alert("Người dùng đã chọn không xóa.");
      // Thực hiện các hành động khác tùy ý
    }
  }

  searchResults: any[] = [];
  searchTerm: string = '';
  filteredList: any[] = [];

  search() {
    this.filteredList = this.categories.filter((item:any) =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.categories = this.filteredList
    console.log(this.categories)
  }
}
