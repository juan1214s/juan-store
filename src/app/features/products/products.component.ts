import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from '@api/products.services.service';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.interface';
import { CarStore } from '@shared/store/shopping-cart';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  //me traigo los el service aca para acceder a los metodos y accedo a products q es una signal y asi la puedo utilizar en cualquier parte es como un constructor
  private readonly productSvc = inject(ProductsService) 
  products =this.productSvc.products;

  cartSore = inject(CarStore)

  //agrego los productos al carrito, pero estos datos se los envio al componete hijo q alla estan los funciones
  onAddToCart(product: Product): void{
    this.cartSore.agregarCart(product)
  }

}
