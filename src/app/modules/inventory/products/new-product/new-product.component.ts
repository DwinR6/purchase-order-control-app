import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../../../../core/utils/alert.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit {

  categories: Category[] = [];
  productForm!: FormGroup;

  inputList: { filename: string | null; imageUrl: string | null; file: File | null }[] = [{ filename: null, imageUrl: null, file: null }];

  constructor(private alertService: AlertService, private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.getCategories();
    this.initializeForm();

  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  initializeForm() {
    this.productForm = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock_quantity: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      specifications: this.fb.array([]),
      images: this.fb.array([]),
    });

  }

  get specifications() {
    return this.productForm.get('specifications') as FormArray;
  }


  addSpecification() {
    const specificationGroup = this.fb.group({
      attribute: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.specifications.push(specificationGroup);
    this.cd.markForCheck();
  }


  // Agrega esto al componente en TypeScript
  get images() {
    return this.productForm.get('images') as FormArray;
  }

  onImageChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.inputList[index].imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)) as string;
      this.inputList[index].file = file;
      this.inputList[index].filename = file.name;
      this.addImageInput();
    }
  }


  // Método para limpiar la imagen en un input específico
  clearImage(index: number) {
    this.inputList[index].imageUrl = null;
    this.inputList[index].file = null;
    this.inputList[index].filename = null;

    // Remove the input from the list if it's empty
    if (!this.inputList[index].imageUrl) {
      this.inputList.splice(index, 1);
    }
  }

  // Método para agregar un nuevo input
  addImageInput() {
    this.inputList.push({ imageUrl: null, file: null, filename: null });
  }


  removeSpecification(index: number) {
    this.specifications.removeAt(index);
  }
  saveProduct(event: Event) {
    event.preventDefault();
    this.showLoading();
    if (this.productForm.valid) {

      const product = this.productForm.value;

      //remove empty images
      this.inputList = this.inputList.filter((image: any) => image.filename !== null);
      this.productService.saveNewProduct(product, this.inputList).then((result) => {
        this.productForm.reset();
        this.removeLoading();
        this.showAlert('Product saved', 'The product was saved successfully', 'success');
      });
    } else {
      this.removeLoading();
      this.showErrorMessage('Please fill all the required fields');

    }
  }

  showAlert(title: string, message: string, icon: any) {
    this.alertService.showAlert(title, message, icon);
  }

  showLoading() {
    this.alertService.showLoading('Saving product...');
  }

  removeLoading() {
    this.alertService.close();
  }

  showErrorMessage(message: string) {
    this.alertService.showErrorMessage(message);
  }

}
