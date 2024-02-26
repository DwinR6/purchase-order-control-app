import { Injectable } from '@angular/core';
import { Firestore, collectionCount, collectionData } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, getDoc, limitToLast, query, setDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly collectionName = 'categories';
  private basePath = '/categories';
  private readonly collectionRef = collection(this.firestore, this.collectionName);
  constructor(private firestore: Firestore, private storage: Storage) { }

  getCategories(): Observable<any> {
    //use firebase not angularfire
    const collectionRef = collection(this.firestore, this.collectionName);
    return collectionData(collectionRef, { idField: 'id' });


  }

  getTotalCategories(): Observable<number> {
    return collectionCount(this.collectionRef);
  }

  getPageCategories(limit: number, startAfter: any): Observable<any> {
    const q = query(this.collectionRef, limitToLast(limit), startAfter(startAfter));
    return collectionData(q, { idField: 'id' });
  }

  getCategoriesByType(type: string): Observable<any> {
    // const q = query(this.collectionRef, where('type', '==', type));
    // return collectionData(q, { idField: 'id' });
    const q = query(this.collectionRef, where('type', '==', type));
    return collectionData(q, { idField: 'id' });

  }

  getCategory(id: string): Observable<any> {
    const docRef = doc(this.collectionRef, id);
    return new Observable<Category>(observer => {
      getDoc(docRef).then(doc => {
        if (doc.exists()) {
          const data = doc.data() as Category;
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

  async saveNewCategory(category: Category, image?: File): Promise<any> {
    category.id = Date.now();
    const categoryRef = doc(this.collectionRef, category.id.toString());
    if (image) {
      const path = `${this.basePath}/${category.id}/${category.name}`;
      const fileRef = ref(this.storage, path);
      const uploadTask = uploadBytesResumable(fileRef, image);
      await uploadTask;
      const url = await getDownloadURL(fileRef);
      category.url_image = url;
    }
    return setDoc(categoryRef, category);
  }

  async saveCategoryImage(category: Category, image: File): Promise<any> {
    const path = `${this.basePath}/${category.id}/${category.name}`;
    const fileRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(fileRef, image);
    await uploadTask;
    const url = await getDownloadURL(fileRef);
    category.url_image = url;
    return this.saveCategoryChanges(category);
  }

  async saveCategoryChanges(category: Category): Promise<any> {
    const categoryRef = doc(this.collectionRef, category.id.toString());
    return setDoc(categoryRef, category);
  }

  async deleteCategory(id: string): Promise<any> {
    const categoryRef = doc(this.collectionRef, id);
    return deleteDoc(categoryRef);
  }

  async deleteCategoryImage(category: Category): Promise<any> {
    const path = `${this.basePath}/${category.id}/${category.name}`;
    const fileRef = ref(this.storage, path);
    return deleteObject(fileRef);
  }






}
