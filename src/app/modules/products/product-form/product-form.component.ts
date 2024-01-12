import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | undefined | null;
  @Output() formSubmit = new EventEmitter<Product>();

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.productForm = this.fb.group({
      'id': [this.product?.id || ''],
      'type': [this.product?.type || '', Validators.required],
      'name': [this.product?.name || '', Validators.required],
      'category': [this.product?.category || '', Validators.required],
      'description': [this.product?.description || '', Validators.required],
      'unit': [this.product?.unit || '', Validators.required],
      'price': [this.product?.price || '', Validators.required],
      'specifications': this.fb.array([]) as FormArray,
      'attachments': this.fb.array([]) as FormArray,
      'stock_quantity': [this.product?.stock_quantity || '', Validators.required],
      'provider': [this.product?.provider || '', Validators.required],
      'status': [this.product?.status || '', ''],
    });

    if (this.product) {
      this.loadFormValues();
    }
  }

  private loadFormValues() {
    this.productForm.patchValue({
      id: this.product?.id,
      type: this.product?.type,
      name: this.product?.name,
      category: this.product?.category,
      description: this.product?.description,
      unit: this.product?.unit,
      price: this.product?.price,
      stock_quantity: this.product?.stock_quantity,
      provider: this.product?.provider,
      status: this.product?.status,

    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value as Product;
      this.formSubmit.emit(formData);
    } else {
      this.markAllFieldsAsTouched(this.productForm);

    }
  }
  private markAllFieldsAsTouched(productForm: FormGroup | FormArray) {
    Object.keys(productForm.controls).forEach(field => {
      const control = productForm.get(field);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllFieldsAsTouched(control);
      }
      control?.markAsTouched({ onlySelf: true });
    });

  }


  addSpecification() {
    const specifications = this.productForm.get('specifications') as FormArray;
    specifications.push(this.fb.group({
      name: [''],
      value: ['']
    }));
  }

  get specifications(): FormArray {
    return this.productForm.get('specifications') as FormArray;
  }

  get attachments(): FormArray {
    return this.productForm.get('attachments') as FormArray;
  }


  removeSpecification(index: number) {
    const specifications = this.productForm.get('specifications') as FormArray;
    specifications.removeAt(index);
  }

  addAttachment() {
    const attachments = this.productForm.get('attachments') as FormArray;
    attachments.push(this.fb.group({
      name: [''],
      url: ['']
    }));
  }

  removeAttachment(index: number) {
    const attachments = this.productForm.get('attachments') as FormArray;
    attachments.removeAt(index);
  }

  handleAttachmentFile(event: any, index: number) {
    const file = event.target.files[0];
    const attachments = this.productForm.get('attachments') as FormArray;
    const attachmentFormGroup = attachments.at(index) as FormGroup;
    attachmentFormGroup.get('file')?.setValue(file);
  }
}
