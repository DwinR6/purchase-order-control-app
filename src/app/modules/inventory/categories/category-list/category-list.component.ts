import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { AlertService } from '../../../../core/utils/alert.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['type', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>([]);
  categories: Category[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alertService: AlertService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
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

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).then(() => {
      this.loadCategories();
      this.alertService.showAlert('Category deleted', 'The category was deleted successfully', 'success');

    });
  }

  confirmDeleteCategory(id: string) {
    this.alertService.showConfirmation('Delete Category', 'Are you sure you want to delete this category?', 'warning').subscribe(result => {
      if (result) {
        this.deleteCategory(id);
      }
    });

  }
}
