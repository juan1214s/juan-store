import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //el signal necesita un valor por defecto entonces le paso un array
  public products = signal<any[]>([]);

  //readonly indica q una vez se le asigna un valor no se puede cambiar y ademas asi accedo a todos los metodos de http client
  private readonly _http = inject(HttpClient);
  
  //environment es como variables de entorno
  private readonly _endPoint = environment.apiURL;

  //aca se inicia la instacia del service
  constructor() { this.getProducts() }

  //el any indica q me devuelve un array, tap hace operaciones secundarias en el flujo del codigo, pipe permite encadenar varias operaciones
  public getProducts(): void {
    this._http
    //?sort=desc inidica q los resultados se devuelvan en forma desendente
    .get<Product[]>(`${this._endPoint}?sort=desc`)
    //al obtener los datos los guardo en products 
    .pipe(tap(( data: any[]) => this.products.set(data)))
    .subscribe();
  }

  public getProductsById(id: string){
    return this._http.get<Product>(`${this._endPoint}/${id}`)
  }


}
