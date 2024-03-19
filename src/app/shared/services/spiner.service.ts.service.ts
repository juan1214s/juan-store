import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinerServiceTsService {

  //el estra predeterminado para mostrar el componente es falso
  isLoading = signal<boolean>(false)

  //oculta el elemento del componente
  public hide(){
    this.isLoading.set(false)
  }

  //muestra el elemento del componente
  public show(){
    this.isLoading.set(true)
  }
}
