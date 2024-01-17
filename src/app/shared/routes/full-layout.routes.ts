import { Routes } from "@angular/router";

export const FULL_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import("../../dashboard/dashboard.module").then((m) => m.DashboardModule),

  },
  {
    path: 'orders',
    loadChildren: () => import("../../modules/orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: 'inventory',
    loadChildren: () => import("../../modules/inventory/inventory.module").then((m) => m.InventoryModule),
  },
];
