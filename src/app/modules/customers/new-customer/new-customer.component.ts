import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../core/utils/alert.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent implements OnInit {

  customerForm!: FormGroup;

  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {

  }

  initializeForm() {
    this.customerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
    });
  }

}
