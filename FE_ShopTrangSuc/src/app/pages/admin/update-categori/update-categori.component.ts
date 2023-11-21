import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-update-categori',
  templateUrl: './update-categori.component.html',
  styleUrls: ['./update-categori.component.scss']
})
export class UpdateCategoriComponent {
  category!:any;
  categoryForm = this.formBuilder.group({
   
    title:[
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
    ]
  });
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ){
    this.route.paramMap.subscribe((param)=> {
      const id = String(param.get('id'))
      this.categoryService.getCategory(id).subscribe(
        (category) => {
          console.log(category);
          this.category = category.categoryData;
          this.categoryForm.patchValue({
            title: category.categoryData.title,
          })
          
        },
        (error) => console.log(error.message)
      );
    });
  }
  onHandleSubmit() {
    if (this.categoryForm.valid) {
      const category = {
        id: this.category._id,
        title: this.categoryForm.value.title || '',
       
        
      };
      console.log(category);

      this.categoryService.updateCategory(category).subscribe((category) => {
        this.toast.success({ detail: "Thông báo", summary: 'Sửa thành công!', duration: 5000, position: "topRight" });
        this.router.navigate(['/admin/listCategori']);
      });
    }
  }
}
