import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  colors: Color[];
  brands: Brand[];
  currentBrandId: number;
  currentColorId: number;

  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getSelectedBrand(brandId: Number) {
    if (this.currentBrandId == brandId) {
      return true;
    }
    else {
      return false;
    }
  }

  getSelectedColor(colorId: Number) {
    if (this.currentColorId == colorId) {
      return true;
    }
    else {
      return false;
    }
  }

  filter() {
    if(this.currentBrandId != null && this.currentColorId != null) {
      this.router.navigate(['/cars/filter/' + this.currentBrandId + "/" + this.currentColorId])
    }
    else if(this.currentColorId != null) {
      this.router.navigate(['/cars/filterColor/' + this.currentColorId])
    }
    else if(this.currentBrandId != null) {
      this.router.navigate(['/cars/filterBrand/' + this.currentBrandId])
    }
  }

}
