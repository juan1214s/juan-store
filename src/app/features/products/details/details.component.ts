import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Signal, inject, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.services.service';
import { Product } from '@shared/models/product.interface';
import { CarStore } from '@shared/store/shopping-cart';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent implements OnInit {
  //crea un arrray con una logitud de 5 elementos y todos inicializan en 0
  starsArray: number[] = new Array(5).fill(0);

  //input permite la entrada de datos del componente hijo y ademas inicializa en 0 la propiedad y renombra con un alias el dato q recibo
  productId = input<number>(0, { alias: 'id' });

  //cuando la S es mayuscula puede devolver un undefined
  product!: Signal<Product | undefined>;

  //aca instacio para poder utilizar los metodos del CarStore
  carStore = inject(CarStore);

  private readonly productsService = inject(ProductsService);
  //DomSanitizer perimite q se incerte archivos o html marcandolos como seguros, de resto no permite la injeccion de elementos
  private readonly _sanitizer = inject(DomSanitizer);

  //aca indico q al recargase la pagina tome el id
  ngOnInit(): void {
    this.product = this.productsService.getProductById(this.productId());
  }

  onAddToCart(){
    this.carStore.agregarCart(this.product() as Product)
  }

  generateStarSVG(index: number): SafeHtml {
    //la inicializo en null para ir agregando el valor a la variable
    let svgContent = null;

    //aca pongo el valor q trae el rate
    const rate = this.product()?.rating.rate as number;
   
    //aca le sumo un valor al index redondeo el valor al entero mas cercano hacia abajo
    if (index + 1 <= Math.floor(rate)) {
      console.log(rate)
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
                </svg>`;
    } else if (index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
          </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
          </path>
          </svg>`;

    }

    //esto inserta q sea autoriza la insercion del svg en el html
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
    
  }
}
