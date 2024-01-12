import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { addDoc, collection, doc, endBefore, getDoc, limit, orderBy, query, setDoc, startAfter } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { Product } from '../models/product.model';
import { Observable, from } from 'rxjs';
import { get } from 'jquery';
import { Specification } from '../models/specification.model';

interface ProductRequestParams {
  limit?: number;
  startAfter?: any;
  endBefore?: any;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}
@Injectable({
  providedIn: 'root'
})



export class ProductService {

  private readonly collectionName = 'products';
  private readonly collectionRef = collection(this.firestore, this.collectionName);
  constructor(private firestore: Firestore, private storage: Storage) {

  }

  /**
   * Get products from Firestore with pagination query
   * @return Observable with products array inside it as value (Observable<Products[]>)}
   * @param params ProductRequestParams {limit, startAfter, endBefore, orderBy, orderDirection}
   *
   */
  getProducts(params?: ProductRequestParams): Observable<any> {
    const q = query(this.collectionRef,
      limit(params?.limit || 10),
      orderBy(params?.orderBy || 'name', params?.orderDirection || 'asc'),
      startAfter(params?.startAfter || null),
      ...(params?.endBefore ? [endBefore(params?.endBefore)] : [])  // Solo agregar endBefore si no es null
    );

    // Resto del código...


    return collectionData(q, { idField: 'id' });

  }


  /**
   * get product from Firestore by id
   * @param id string
   * @returns Observable with product object inside it as value (Observable<Product>)
   * @throws Error if product is not found
   * @throws Error if product image is not found
   * @throws Error if product specifications are not found
   * @throws Error if product attachments are not found
   */
  getProduct(id: string): Observable<Product> {
    const productRef = doc(this.collectionRef, id);
    return new Observable<Product>((observer) => {
      getDoc(productRef).then((productDoc) => {
        if (productDoc.exists()) {
          const productData = productDoc.data() as Product;

          observer.next(productData);
          observer.complete();
        } else {
          observer.error(new Error('Product not found'));
        }
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
  /**
   * save product to Firestore
   * @param product Product
   * @returns Promise with product id
   * @throws Error if product is not saved
   * @throws Error if product image is not saved
   *
   */
  async saveNewProduct(product: Product): Promise<string> {
    // Add the new product to the Firestore collection await addDoc(this.collectionRef, <Product>product)
    //set product id to current date in milliseconds and document id set to product id
    // const productRef = doc(this.collectionRef, product.id.toString());
    // await setDoc(productRef, product);

    product.id = Date.now();
    const { specifications, attachments, ...productData } = product;

    const productRef = doc(this.collectionRef, product.id.toString());
    await setDoc(productRef, productData);
    if (!productRef) {
      throw new Error('Product not saved');
    }


    return productRef.id;

  }

  /**
   * save specification to product in Firestore
   * @param productId
   * @param specification
   */
  async saveAttribute(productId: string, specification: Specification): Promise<string> {
    const productRef = doc(this.collectionRef, productId);
    const specificationsCollectionRef = collection(productRef, 'specifications');
    const specificationDocRef = await addDoc(specificationsCollectionRef, specification);
    return specificationDocRef.id;
  }

  /**
   * save attachment to product in Firestore
   * @param productId
   * @param attachment
   */
  async saveAttachment(productId: string, attachment: any): Promise<string> {
    const productRef = doc(this.collectionRef, productId);
    const attachmentsCollectionRef = collection(productRef, 'attachments');
    const attachmentDocRef = await addDoc(attachmentsCollectionRef, attachment);
    return attachmentDocRef.id;
  }


  /**
   * update product in Firestore
   * @param product Product
   * @param id string
   * @returns Promise with product id
   * @throws Error if product is not updated
   * @throws Error if product image is not updated
   * @throws Error if product specifications are not updated
   * @throws Error if product attachments are not updated
   *
   *
   */
  async updateProduct(product: Product, id: string): Promise<string> {
    const productRef = doc(this.collectionRef, id);
    const { specifications, attachments, ...productData } = product;
    await setDoc(productRef, productData);
    if (!productRef) {
      throw new Error('Product not updated');
    }
    return productRef.id;
  }

}
