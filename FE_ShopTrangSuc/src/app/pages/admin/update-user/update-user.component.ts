import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  user!: any;
  userForm = this.formBuilder.group({
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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.paramMap.subscribe((param)=> {
      const id = String(param.get('id'))
      this.userService.getUser(id).subscribe(
        (user) => {
          console.log(user);
          this.user = user.userData;
          this.userForm.patchValue({
            firstname: user.categoryData.firstname,
            lastname: user.categoryData.lastname,
            email: user.categoryData.email,
            mobile: user.categoryData.mobile,
            password: user.categoryData.password,
          })
          
        },
        (error) => console.log(error.message)
      );
    });
  }
  onHandleSubmit() {
    if (this.userForm.valid) {
      const category = {
        id: this.user._id,
        firstname: this.userForm.value.firstname || '',
        lastname: this.userForm.value.lastname || '',
        email: this.userForm.value.email || '',
        mobile: this.userForm.value.mobile || '',
        password: this.userForm.value.password || '',
        
      };
      console.log(category);

      this.userService.updateUser(category).subscribe((user) => {
        alert("update thanh cong !!");
        this.router.navigate(['/admin/listUser']);
      });
    }
  }
}
