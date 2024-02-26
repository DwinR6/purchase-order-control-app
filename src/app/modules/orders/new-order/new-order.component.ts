import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../core/utils/alert.service';
import { OrderService } from '../../../core/services/order.service';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent implements OnInit {

  orderForm!: FormGroup;

  products: Product[] = [];
  customers: Customer[] = [];

  constructor(alertService: AlertService, private formBuilder: FormBuilder, private orderService: OrderService, private productService: ProductService, private customerService: CustomerService) { }


  ngOnInit(): void {
    this.getProducts();
    this.getCustomers();
    this.initializeForms();
    this.items.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  initializeForms() {
    this.orderForm = this.formBuilder.group({
      order_number: [''],
      order_date: [''],
      delivery_date: [''],
      customer: this.formBuilder.group({
        existingCustomer: [null],
        newCustomer: this.formBuilder.group({
          name: [''],
          email: [''],
          phone: [''],
          address: this.formBuilder.group({
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
          }),
        }),
      }),
      items: this.formBuilder.array([]),
      total_amount: [0],
      status: [''],
    });

    this.addItem();
  }

  get existingCustomer() {
    return this.customer.get('existingCustomer');
  }

  get customer() {
    return this.orderForm.get('customer') as FormGroup;
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  getItemExistingProduct(index: number) {
    return this.items.at(index).get('existingProduct');
  }



  addItem() {
    this.items.push(
      this.formBuilder.group({
        existingProduct: [null],
        newProduct: this.formBuilder.group({
          name: [''],
          unit: [''],
          price: [0],

          // Otros campos del producto personalizado
        }),
        quantity: [0],
        total_amount: [0],
      })
    );
  }


  get notes() {
    return this.orderForm.get('notes') as FormArray;
  }

  addNote() {
    this.notes.push(this.formBuilder.group({
      note_by: [''],
      note: [''],
    }));
  }

  get attachments() {
    return this.orderForm.get('attachments') as FormArray;
  }

  addAttachment() {
    this.attachments.push(this.formBuilder.group({
      file: [''],
    }));
  }


  async saveOrder(event: Event) {
    event.preventDefault();
    if (this.orderForm.valid) {
      const order = this.orderForm.value;
      await this.orderService.saveNewOrder(order);
    }
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  calculateSubtotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value;
    const price = item.get('existingProduct')?.value?.price || item.get('newProduct')?.value?.price;
    item.get('total_amount')?.setValue(quantity * price);
    this.calculateTotal();
    //return quantity * price;
  }

  calculateTotal() {
    let total = 0;
    this.items.value.forEach((item: any) => {
      total += item.total_amount;
    });
    this.orderForm.get('total_amount')?.setValue(total);
  }

}
