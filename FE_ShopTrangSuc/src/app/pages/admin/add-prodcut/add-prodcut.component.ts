import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { NgxUploaderModule,UploaderOptions  } from 'ngx-uploader';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-prodcut',
  templateUrl: './add-prodcut.component.html',
  styleUrls: ['./add-prodcut.component.scss'],
})
export class AddProdcutComponent {
  public files: File[] = [];
  public images: File[] = [];
  categories: any = []
  onFileChange(event: any) {
    const files = event.target.files;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      const reader = new FileReader();
      reader.onloadend = () => {
        // Lưu trữ thông tin đầy đủ của file, không chỉ là đường dẫn ảnh
        const imageFile: File = file;
        this.images.push(imageFile);
  
        // Bạn có thể sử dụng imageFile.name, imageFile.size, và các thuộc tính khác của File nếu cần
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  products: any = {};
  productForm = this.formBuider.group({
    title:[
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
    ],
    price:[
      0,
      [Validators.required, Validators.min(1)]
    ],
    description:[
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
    ],
    brand:[
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
    ],
    slug:[
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
    ],
    images:[
      '',
      [Validators.required]
    ],
    priceroot:[
      '',
      [Validators.required,Validators.min(1), Validators.minLength(6), Validators.maxLength(255)]
    ],
    category:[
      '',
      [Validators.required]
    ],
    
  })
  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router, private formBuider: FormBuilder, private toast: NgToastService) {
    this.categoryService.getCategories().subscribe(
      (response:any) => {
        this.categories = response.getAllCategory;
      },
      (error) => {
        console.log(error);
      }
    );

  }
  onsubmit() {
    this.productService.addProducts(this.products, this.files).subscribe((response) => {
      console.log('san pham them thanh cong: ',response);
      this.toast.success({ detail: "Thông báo", summary: 'add thành công!', duration: 5000, position: "topRight" });
      this.router.navigate(['/admin/list'])
      // alert("add thanh cong")
      // Thực hiện các hành động sau khi sản phẩm được thêm thành công
    },
    error => {
      this.toast.error({ detail: "Thông báo", summary: 'Lỗi khi thêm sản phẩm!', duration: 5000, position: "topRight" });
      console.log("loi khi them san pham: ", error);
      // Xử lý lỗi nếu có
    }
    );
    console.log('Danh sách ảnh:', this.images);
  }


  // onFileDropped(event: any) {
  //   if (event instanceof FileList) {
  //     for (let i = 0; i < event.length; i++) {
  //       const file = event.item(i);
  //       if (file) {
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //           if (e && e.target) {
  //             this.imageList.push(e.target.result as string);
  //           } else {
  //             console.error('Lỗi: e hoặc e.target là null');
  //           }
  //         };
  //         reader.readAsDataURL(file);
  //       } else {
  //         console.error('Lỗi: File là null');
  //       }
  //     }
  //   } else {
  //     console.error('Lỗi: Sự kiện không phải là FileList');
  //   }
  // }
}
