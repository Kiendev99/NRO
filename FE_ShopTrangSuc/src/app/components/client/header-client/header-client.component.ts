import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent {
  showmap: boolean = false;
  page: number = 1;
  limit: number = 10;
  constructor(private productService: ProductService, private router: Router, private authService: AuthService) {

  }
  loadData() {
    this.productService.getProducts(this.page, this.limit).subscribe(
      (response: any) => {
        this.products = response.productDatas;
        // console.log(this.products);

        //  console.log(this.products.docs);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.loadData();
  }
  products: any = []
  searchResults: any[] = [];
  searchTerm: string = '';
  filteredList: any[] = [];

  search() {
    this.filteredList = this.products.filter((item: any) =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.products = this.filteredList
    console.log(this.products)
  }
  showMap() {
    this.showmap = !this.showmap
  }
  CheckLogin(): boolean {
    if (this.authService.checklogin()) {
      this.router.navigate(['/infor-account']);
      return true;

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
