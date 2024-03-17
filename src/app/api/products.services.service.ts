import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //el signal necesita un valor por defecto entonces le paso un array
  public products = signal<Product[]>([]);

  //readonly indica q una vez se le asigna un valor no se puede cambiar y ademas asi accedo a todos los metodos de http client
  private readonly _http = inject(HttpClient);
  
  //environment es como variables de entorno
  private readonly _endPoint = environment.apiURL;

  //es una propiedad de solo lectura
  private readonly _injector = inject(EnvironmentInjector)

  //aca se inicia la instacia del service
  constructor() { this.getProducts() }

  //el any indica q me devuelve un array, tap hace operaciones secundarias en el flujo del codigo, pipe permite encadenar varias operaciones
  public getProducts(): void {
    this._http
    //?sort=desc inidica q los resultados se devuelvan en forma desendente
    .get<Product[]>(`${this._endPoint}?sort=desc`)
    //al obtener los datos los guardo en products 
    .pipe(
      map(
        //simplemete le agrego la propiedad qty aca elemento q recibo
        (products: Product[])=> products.map((product: Product)=> ({...product, qty: 1}))
      ),
      //al recibir los products los guardo en la signal products
      tap(( products: Product[]) => this.products.set(products)))
    .subscribe();
  }

  //el runInInjectionContext es una funcion con para ejecucion con del injector
  public getProductById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/${id}`)
      )
    );
  }


}
