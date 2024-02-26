import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../../core/models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from '../../../core/utils/alert.service';
import { OrderService } from '../../../core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['customer', 'date', 'total', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);

  orders: Order[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alertService: AlertService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewOrder(orderId: string) {
    this.router.navigate(['/orders', orderId]);
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).then(() => {
      this.alertService.showSuccessMessage('Order deleted successfully');
    });
  }

  editOrder(orderId: string) {
    this.router.navigate(['/orders/edit', orderId]);
  }
}
