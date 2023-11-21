import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  imgList: any;
  demoProduct: any = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    activatedRoute.params.subscribe((params) => {
      productService.getProduct(params['id']).subscribe((data) => {
        this.product = data.productData;
        this.demoProduct = data.productData;
        console.log(data.productData);

        this.imgList = data.productData.images;
        this.cdr.detectChanges(); // Thử loại bỏ NgZone
      });
    });
  }

  ngOnInit(): void {
    this.getRoute(this.activatedRoute.snapshot.params['id']);
  }

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.imgList.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.imgList.length) % this.imgList.length;
  }

  addToCart() {
    const local = localStorage.getItem("user");
    const user:any = local && JSON.parse(local);

    const productId = this.demoProduct._id;

    console.log(user?._id);
    console.log(productId);

    const size = 20; // Đặt giá trị cho size nếu cần
    const quantity = 2;

    this.cartService.addToCart(productId, size, quantity,user?._id).subscribe(
      (response) => {
        console.log('Add to cart successful', response);
        // Bước 3: Xử lý thêm vào giỏ hàng thành công (nếu cần)
      },
      (error) => {
        console.error('Add to cart failed', error);
        // Xử lý lỗi nếu có
      }
    );
  }



  getRoute(id: any): void {
    this.productService.getProduct(id).subscribe((res: any) => {
      this.product = res.product;
    });
  }
}
