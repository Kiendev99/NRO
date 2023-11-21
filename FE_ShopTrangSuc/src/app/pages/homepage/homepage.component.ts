import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  topcreatedAt: any = []
  saleproduct: any = []
  topProducts: any = []
  filteredProducts: any = [];
  showForm: boolean = false
  sortedByPrice: boolean = false
  products: any = [];
  topFourItems: any = [];
  page: number = 1;
  limit: number = 100;
  constructor(private productService: ProductService, private router: Router) {}
  isHovering: boolean = false;

  loadData() {
    this.productService.getProducts(this.page, this.limit).subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = this.products.productDatas.filter((product:any) => product.sold > 100);
      console.log(this.filteredProducts);

    });
  }

  toggleSortByPrice() {
    this.productService.getProducts(this.page, this.limit).subscribe((data: any[]) => {
      this.products = data;
      this.topProducts = this.products.productDatas.filter((product:any) => product.assess > 100);
      console.log(this.topProducts);

    });
  }

  filtercreatedAt() {
    this.productService.getProducts(this.page, this.limit).subscribe((data: any[]) => {
      this.products = data;
      this.topcreatedAt = this.products.productDatas
      // Sắp xếp theo createdAt giảm dần (newest first)
      this.topcreatedAt = this.topcreatedAt.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      // this.topcreatedAt = this.products.productDatas.filter((product:any) => product.createdAt >= 1698009190100);
      console.log(this.topcreatedAt);
    });
  }

  doubledPriceProducts(){
    this.productService.getProducts(this.page, this.limit).subscribe((data: any[]) => {
      this.products = data;
      this.saleproduct = this.products.productDatas;
      // Tạo mảng mới với các sản phẩm có giá gốc gấp đôi giá hiện tại
      // this.saleproduct = this.saleproduct.filter((product:any) => product.price * 2 === product.priceroot);
      // console.log(this.saleproduct);
        // Tính giảm giá phần trăm và lọc sản phẩm giảm giá hơn 50%
        this.saleproduct = this.saleproduct.filter((product:any) => {

          const discountPercentage = ((product.price - product.priceroot) / product.price) * 100;

          return discountPercentage > 50;


        });
        console.log(this.saleproduct);
    })
  }

  ngOnInit() {
    this.toggleSortByPrice()
    this.loadData()
    this.filtercreatedAt()
    this.doubledPriceProducts()
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

  showHoverImage() {
    this.isHovering = true;
  }

  hideHoverImage() {
    this.isHovering = false;
  }
  hover: Boolean = false;

  selectProduct(id: Number) {
    console.log(id);

  this.router.navigate(['/product', id]).then();
  }



}
