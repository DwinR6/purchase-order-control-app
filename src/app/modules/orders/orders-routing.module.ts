import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: OrdersComponent
      },
      {
        path: 'list/new',
        component: NewOrderComponent
      },
    ],
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
