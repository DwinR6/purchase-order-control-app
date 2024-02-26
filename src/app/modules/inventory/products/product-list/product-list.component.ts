import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { AlertService } from '../../../../core/utils/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['type', 'name', 'category', 'unit', 'price', 'stock_quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  products: Product[] = [];
  pageSize = 10;
  totalProducts = 0;
  currentPage = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private alertService: AlertService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    //this.productService.getProducts().subscribe(products => {
    //  this.products = products;
    //  this.dataSource = new MatTableDataSource<Product>(this.products);
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    //});

    this.productService.getTotalProducts().subscribe(totalProducts => {
      this.totalProducts = totalProducts;
    });
    this.productService.getProductsPage(this.currentPage, this.pageSize).subscribe(products => {
      this.products = products;
    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).then(() => {
      this.loadProducts();
      this.alertService.showAlert('Product deleted', 'The product was deleted successfully', 'success');

    });
  }

  confirmDeleteProduct(id: string) {
    this.alertService.showConfirmation('Delete Product', 'Are you sure you want to delete this product?', 'warning').subscribe(result => {
      if (result) {
        this.deleteProduct(id);
      }
    });

  }


}
