import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';

const routes: Routes = [
  {
    // path: 'products',
    path: '',
    children: [
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/new',
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
      {
        path: 'categories',
        component: CategoryListComponent
      },
      {
        path: 'categories/new',
        component: NewCategoryComponent
      },
      {
        path: 'categories/edit/:id',
        component: ProductListComponent
      },
      {
        path: 'categories/delete/:id',
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
export class InventoryRoutingModule { }
