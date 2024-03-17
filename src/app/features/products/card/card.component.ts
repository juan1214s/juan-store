import { CommonModule, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  //aca recibo un signal de tipo product, dentran los datos q me pasan desde el componente padre
  product = input.required<Product>();
  
  //aca indico q emito un evento a mi componente padre y emito un evento de tipo Product 
  @Output() agregarCarritoEvent = new EventEmitter<Product>();
  onAddtoCart(): void{
    this.agregarCarritoEvent.emit(this.product())
  }



}
