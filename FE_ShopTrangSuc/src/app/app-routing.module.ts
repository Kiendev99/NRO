import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListproductComponent } from './pages/listproduct/listproduct.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WebsiteLayoutComponent } from './layouts/website-layout/website-layout.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { BlogpageComponent } from './pages/blogpage/blogpage.component';
import { AddProdcutComponent } from './pages/admin/add-prodcut/add-prodcut.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { ListComponent } from './pages/admin/list/list.component';
import { ListCategoriComponent } from './pages/admin/list-categori/list-categori.component';
import { AddCategoriComponent } from './pages/admin/add-categori/add-categori.component';
import { UpdateCategoriComponent } from './pages/admin/update-categori/update-categori.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { UserPaymentComponent } from './pages/user-payment/user-payment.component';
import { CheckoutCartComponent } from './pages/checkout-cart/checkout-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ListuserComponent } from './pages/admin/listuser/listuser.component';
import { UpdateUserComponent } from './pages/admin/update-user/update-user.component';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { CartComponent } from './pages/cart/cart.component';
import { InforAccountComponent } from './pages/account/infor-account/infor-account.component';
import { UpdateAccountComponent } from './pages/account/update-account/update-account.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  //client
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'products', component: ListproductComponent },
      { path: 'slide', component: SlideshowComponent },
      { path: 'blog', component: BlogpageComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'user-payment', component: UserPaymentComponent },
      { path: 'checkout', component: CheckoutCartComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'infor-account', component: InforAccountComponent },
      { path: 'update-account', component: UpdateAccountComponent },
    ],
  },
  //admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'list', component: ListComponent },
      { path: 'listCategori', component: ListCategoriComponent },

      { path: 'listUser', component: ListuserComponent },
      { path: 'addUser', component: AddUserComponent },
    ],
  },
  {
    path: 'admin',

    children: [
      { path: 'addProduct', component: AddProdcutComponent },
      { path: 'addCategori', component: AddCategoriComponent },
      { path: 'update/:id', component: UpdateProductComponent },
      { path: 'updateCategori/:id', component: UpdateCategoriComponent },
      { path: 'updateUser/:id', component: UpdateUserComponent },
    ],
  },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: SendEmailComponent },
  { path: 'resetpassword', component: ForgotPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
