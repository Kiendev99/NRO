import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss'],
})
export class ListproductComponent {
  filteredProducts: any = [];
  showForm: boolean = false;
  showForms: boolean = false;
  showFormss: boolean = false;
  sortedByPrice: boolean = false;
  products: any = [];
  page: number = 1;
  limit: number = 12;
  constructor(private productService: ProductService, private router: Router) {}
  isHovering: boolean = false;
  //lấy dữ liệu
  loadData() {
    this.productService.getProducts(this.page, this.limit).subscribe(
      (response: any) => {
        this.products = response.productDatas;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.loadData();
  }
// đổi ảnh sản phẩm

  showHoverImage() {
    this.isHovering = true;
  }

  hideHoverImage() {
    this.isHovering = false;
  }
  hover: Boolean = false;
// chuyển trang
  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadData();
    }
  }
// chuyển trang
  nextPage() {
    this.page++;
    this.loadData();
  }

// lọc giá từ thấp đến cao
  toggleSortByPrice() {
    this.sortedByPrice = !this.sortedByPrice;

    if (this.sortedByPrice) {
      this.products.sort((a: any, b: any) => a.price - b.price);
    } else {
      this.loadData();
    }
  }
// lọc giá từ cao đến thấp
  toggleSortByPriceS() {
    this.sortedByPrice = !this.sortedByPrice;

    if (this.sortedByPrice) {
      this.products.sort((a: any, b: any) => b.price - a.price);
    } else {
      this.loadData();
    }
  }

  // hiện thị lọc
  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleForms() {
    this.showForms = !this.showForms;
  }
  toggleFormss() {
    this.showFormss = !this.showFormss;
  }

  // lọc theo số lượng sản phẩm đã bán
  filterProductsBySold() {
    this.sortedByPrice = !this.sortedByPrice;
    if(this.sortedByPrice){
      this.productService
      .getProducts(this.page, this.limit)
      .subscribe((data: any[]) => {
        this.products = data;
        this.filteredProducts = this.products.productDatas.filter(
          (product: any) => product.sold > 50
        );
        console.log(this.filteredProducts);
        this.products = this.filteredProducts;
      });
    } else {
      this.loadData();
    }

  }

  // lọc theo sóo lượng người đánh giá
  filterProductsByassess() {
    this.sortedByPrice = !this.sortedByPrice;
    if(this.sortedByPrice){
      this.productService
      .getProducts(this.page, this.limit)
      .subscribe((data: any[]) => {
        this.products = data;
        // console.log(this.products);

        this.filteredProducts = this.products.productDatas.filter(
          (product: any) => product.assess > 50
        );
        console.log(this.filteredProducts);
        this.products = this.filteredProducts;
      });
    } else {
      this.loadData();
    }

  }

  searchResults: any[] = [];
  searchTerm: string = '';
  filteredList: any[] = [];

  search() {
    this.filteredList = this.products.filter((item:any) =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.products = this.filteredList
    console.log(this.products)
  }

  // lọc theo brand  PNJ
  filterProductsByBrandPNJ() {
    this.sortedByPrice = !this.sortedByPrice;
    if(this.sortedByPrice){
      this.productService
      .getProducts(this.page, this.limit)
      .subscribe((data: any[]) => {
        this.products = data;
        this.filteredProducts = this.products.productDatas.filter(
          (product: any) => product.brand == 'PNJ'
        );
        console.log(this.filteredProducts);
        this.products = this.filteredProducts;
      });
    } else {
      this.loadData()
    }

  }

  // lọc theo brand  TNJ
  filterProductsByBrandNRO() {
    this.sortedByPrice = !this.sortedByPrice;
    if(this.sortedByPrice){
      this.productService
      .getProducts(this.page, this.limit)
      .subscribe((data: any[]) => {
        this.products = data;
        this.filteredProducts = this.products.productDatas.filter(
          (product: any) => product.brand == 'NRO'
        );
        console.log(this.filteredProducts);
        this.products = this.filteredProducts;
      });
    } else {
      this.loadData()
    }

  }

  images = ['https://cdn.pnj.io/images/promo/184/CT_LOVE_WEDDING_1972x640CTA.jpg',
  'https://cdn.pnj.io/images/promo/182/TABSALE_CHUNG_THANG_09-1972x640CTA.jpg',
   'https://cdn.pnj.io/images/promo/180/pnjfast-1972x640CTA.jpg'];
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // lọc theo brand  TNJ
  filterProductsByBrandTTL() {
    this.sortedByPrice = !this.sortedByPrice;
    if(this.sortedByPrice){
      this.productService
      .getProducts(this.page, this.limit)
      .subscribe((data: any[]) => {
        this.products = data;
        this.filteredProducts = this.products.productDatas.filter(
          (product: any) => product.brand == 'TTL'
        );
        console.log(this.filteredProducts);
        this.products = this.filteredProducts;
      });
    } else {
      this.loadData()
    }

  }
  selectProduct(id: Number) {
    console.log(id);

  this.router.navigate(['/product', id]).then();
  }
}
