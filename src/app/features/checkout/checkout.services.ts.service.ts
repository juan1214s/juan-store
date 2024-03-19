import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class CheckoutServices {

  private readonly _http = inject(HttpClient);
  private readonly _url = environment.serverUrl;

  //va recibir un array de tipo producto y mando el array en el cuerpo de la peticion y tambien mando la key q proporciona stripe
  onProcededToPay(products: Product[]): any{
    return this._http.post(`${this._url}/checkout`, {items: products})
    .pipe(
      map(async (res: any) => {
        const stripe = await loadStripe(environment.apiKeyJuanStore);
        stripe?.redirectToCheckout({ sessionId: res.id })
      })
    ).subscribe({
      error: (err) => console.log('Error', err)
    })
  }

  
}
