import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showAlert(title: string, message: string, icon: SweetAlertOptions['icon'] = 'info'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
    });
  }

  showConfirmation(
    title: string,
    text: string,
    icon: SweetAlertOptions['icon'] = 'question'
  ): Observable<boolean> {
    return from(
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
      })
    ).pipe(switchMap((result) => from([result.isConfirmed])));
  }

  showLoading(title: string): void {
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  close(): void {
    Swal.close();
  }

  showErrorMessage(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }

  showSuccessMessage(message: string): void {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
    });
  }

  showInfoMessage(message: string): void {
    Swal.fire({
      title: 'Info',
      text: message,
      icon: 'info',
    });
  }

  showWarningMessage(message: string): void {
    Swal.fire({
      title: 'Warning',
      text: message,
      icon: 'warning',
    });
  }

}
