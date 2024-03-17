import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarStore } from '@shared/store/shopping-cart';

@Component({
  selector: 'app-headere',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass, CurrencyPipe],
  templateUrl: './headere.component.html',
  styleUrl: './headere.component.scss'
})
export class HeadereComponent {

  //esto segun el estado va permitir el renderizado del componente, el cual por defecto es falso
  showCart = signal<boolean>(false);
  
  CarStore = inject(CarStore)
}
