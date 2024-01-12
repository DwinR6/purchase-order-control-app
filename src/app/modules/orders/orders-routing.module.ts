import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: OrdersComponent
    }],
  },
  {
    path: '**',
    redirectTo: 'orders'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
