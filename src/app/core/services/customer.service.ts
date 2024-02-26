import { Injectable } from '@angular/core';
import { Firestore, collectionCount, collectionData } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { collection, doc, getDoc, limitToLast, query, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly collectionName = 'customers';
  private basePath = '/customers';
  private readonly collectionRef = collection(this.firestore, this.collectionName);

  constructor(private firestore: Firestore, private storage: Storage) { }

  getCustomers(): Observable<any> {
    return collectionData(this.collectionRef, { idField: 'id' });
  }

  getTotalCustomers() {
    return collectionCount(this.collectionRef);
  }

  getPageCustomers(limit: number, startAfter: any) {
    const q = query(this.collectionRef, limitToLast(limit), startAfter(startAfter));
    return collectionData(q, { idField: 'id' });
  }

  getCustomer(id: string) {
    const docRef = doc(this.collectionRef, id);
    return new Observable<any>(observer => {
      getDoc(docRef).then(doc => {
        if (doc.exists()) {
          const data = doc.data();
          observer.next(data);
          observer.complete();
        } else {
          observer.error('No such document!');
        }
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  saveNewCustomer(customer: any) {
    customer.id = Date.now();
    const customerRef = doc(this.collectionRef, customer.id.toString());
    return setDoc(customerRef, customer);
  }

  saveCustomerChanges(customer: any) {
    const customerRef = doc(this.collectionRef, customer.id.toString());
    return setDoc(customerRef, customer);
  }

  deleteCustomer(customer: any) {
    const customerRef = doc(this.collectionRef, customer.id.toString());
    return setDoc(customerRef, customer);
  }


}
