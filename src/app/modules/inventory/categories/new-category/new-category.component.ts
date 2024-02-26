import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../../../core/utils/alert.service';
import { event } from 'jquery';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.scss'
})
export class NewCategoryComponent implements OnInit, OnDestroy {

  categoryForm!: FormGroup;
  constructor(private alertService: AlertService, private fb: FormBuilder, private categoryService: CategoryService, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    //this.categoryForm.reset();
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }


  saveCategory() {
    event
    if (this.categoryForm.valid) {
      this.showLoading();
      const category = this.categoryForm.value;
      this.categoryService.saveNewCategory(category).then(() => {
        this.categoryForm.reset();
        this.removeLoading();
        this.showAlert('Category saved', 'The category was saved successfully', 'success');
      });
    }
  }

  showAlert(title: string, message: string, icon: any) {
    this.alertService.showAlert(title, message, icon);
  }

  showLoading() {
    this.alertService.showLoading('Saving category...');
  }

  removeLoading() {
    this.alertService.close();
  }
}
