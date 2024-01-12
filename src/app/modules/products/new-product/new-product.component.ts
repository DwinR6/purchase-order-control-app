import { Component } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  constructor(private productService: ProductService, private router: Router) {

  }

  onSubmit(product: Product) {

    this.productService.saveNewProduct(product).then((id) => {
      this.router.navigate(['/products', id]);
    }).catch((error) => {
      console.log(error);
    });
  }
}
