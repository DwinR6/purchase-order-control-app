import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.productService.getProduct(this.productId).pipe(
          catchError((error) => {
            console.log(error);
            throw error;
          })).subscribe((product) => {
            this.product = product;

          });
      }
    });
  }

  onSubmit(product: Product) {
    if (this.productId && this.product) {
      this.productService.updateProduct(product, this.productId).then(() => {
        this.router.navigate(['/products', this.productId]);
      }
      ).catch((error) => {
        console.log(error);
      });


    }
  }
}
