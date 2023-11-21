import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent {
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
      [Validators.required, Validators.minLength(3), Validators.maxLength(255),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]
    ],
    mobile:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255),Validators.pattern(/^(09|03|07|08|05)\d{8}$/)]
    ],
    address:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)]
    ],
    password:[
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ],
    newPassword:[
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ]
  })
constructor(
  private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
)
{
  this.route.paramMap.subscribe((param)=>{
    const users = JSON.parse(localStorage.getItem("user") as string);
    const id = users._id
     
    this.userService.getUser(id).subscribe(
      (user) => {
        console.log(user);
        this.user = user.use;
        this.userForm.patchValue({
          firstname: user.use.firstname,
          lastname: user.use.lastname,
          email: user.use.email,
          address: user.use.address,
          mobile: user.use.mobile,
          password: user.use.password
         
        })
        
      },
      (error) => console.log(error.message)
    );
  });
}
onChange(e:any){
 this.user[e.target.name] = e.target.value;
 console.log(this.user);
 
  
}
onSubmit(){
  
  if(this.userForm.valid){
    console.log(this.user);
    const user = {
      _id:this.user._id,
      firstname: this.userForm.value.firstname || '',
      lastname: this.userForm.value.lastname || '',
      email: this.userForm.value.email || '',
      address: this.userForm.value.address || '',
      mobile: this.userForm.value.mobile || '',
      password:  this.userForm.value.newPassword || '',
    };
    this.userService.updateUser(user).subscribe((response) => {
      this.toast.success({ detail: "Thông báo", summary: 'Cập Nhật Tài Khoản Thành Công', duration: 5000, position: "topRight" });

      console.log(response);
     
      
    })
  }
    
}
} 
