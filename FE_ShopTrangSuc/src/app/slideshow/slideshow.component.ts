import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
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
}
