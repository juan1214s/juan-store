import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarStore } from '@shared/store/shopping-cart';
import CheckoutServices from './checkout.services.ts.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent {
carStore = inject(CarStore);

private readonly _checkoutService = inject(CheckoutServices)

onProcededToPay(){

}
  
deleteProduct(id: number){

}

limpiarCart(){}

}
