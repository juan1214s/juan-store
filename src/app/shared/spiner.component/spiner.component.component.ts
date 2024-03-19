import { Component, OnInit, inject } from '@angular/core';
import { SpinerServiceTsService } from '@shared/services/spiner.service.ts.service';

@Component({
  standalone: true,
  selector: 'app-spiner',
  templateUrl: './spiner.component.component.html',

})
//esto va crear un efecto mientras las solicitades http se procesan
export default class Spinercomponent {

  //si voy a utilizar la signal en el html debo de ponerle al final unos ()
private readonly spinerSvg = inject(SpinerServiceTsService);
//traigo el metodo y los asigno a la variable
isLoading = this.spinerSvg.isLoading;

}
