import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {
    // path: 'products',
    path: '',
    children: [
      {
        path: 'list',
        component: ProductListComponent
      },
      {
        path: 'new',
        component: NewProductComponent
      },
      {
        path: 'edit/:id',
        component: ProductListComponent
      },
      {
        path: 'delete/:id',
        component: ProductListComponent
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'products'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
