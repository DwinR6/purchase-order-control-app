import { Injectable } from '@angular/core';
import { Firestore, collectionCount, collectionData } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { collection, doc, getDoc, limitToLast, query, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly collectionName = 'orders';
  private basePath = '/orders';
  private readonly collectionRef = collection(this.firestore, this.collectionName);
  constructor(private firestore: Firestore, private storage: Storage) { }

  getOrders(): Observable<any> {
    const collectionRef = collection(this.firestore, this.collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }

  getTotalOrders(): Observable<number> {
    return collectionCount(this.collectionRef);
  }

  getPageOrders(limit: number, startAfter: any): Observable<any> {
    const q = query(this.collectionRef, limitToLast(limit), startAfter(startAfter));
    return collectionData(q, { idField: 'id' });
  }

  getOrder(id: string): Observable<any> {
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

  async saveNewOrder(order: Order): Promise<any> {
    order.id = Date.now();
    const orderRef = doc(this.collectionRef, order.id.toString());
    return setDoc(orderRef, order);
  }

  async saveOrderChanges(order: Order): Promise<any> {
    const orderRef = doc(this.collectionRef, order.id.toString());
    return setDoc(orderRef, order);
  }

  async deleteOrder(orderId: string): Promise<any> {
    const orderRef = doc(this.collectionRef, orderId);
    return updateDoc(orderRef, { status: 'deleted' });
  }

  async restoreOrder(order: Order): Promise<any> {
    const orderRef = doc(this.collectionRef, order.id.toString());
    return updateDoc(orderRef, { status: 'active' });
  }


}
