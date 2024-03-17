import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '@shared/models/product.interface';

export interface CarStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

//aca asigno los valore iniciales de mi carrito
const inicialState: CarStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CarStore = signalStore(
  { providedIn: 'root' },
  withState(inicialState),
  //esto recalcula la suma de los valores y la cantidad de productos en el carrito
  withComputed(({ products }) => ({
    //esto cada vez q detecte un cambio recalcula la cantidad de productos en el carrito
    productsCount: computed(() => calculateProductCount(products())),
    //esto suma los precios totales de los productos en el carrito
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),

  //aca van los metodos q van permitir agregar, eliminar productos a mi carrito
  withMethods(({ products, ...store }) => ({
    agregarCart(product: Product) {
      //si el producto esta presente lo devuelve
      const isProductCart = products().find(
        (item: Product) => item.id === product.id
      );
      //si el producto ya esta presente y agrego mas, simplemente suma la cantidad y el valor del mismo
      if (isProductCart) {
        isProductCart.qty++;

        //aca multiplico las cantidad por el precio
        isProductCart.subTotal = isProductCart.qty * isProductCart.price

        //crea una copia del array existente 
        patchState(store, { products: [...products()] });
      } else {
        //aca crea un nuevo array con el producto q pase por los parametros
        patchState(store, { products: [...products(), product] });
      }
      
    },
    
    deleteProduct(id: number) {
      //mostrara todos los productos menos el q se paso por parametros
      const actualizaProducts = products().filter(
        (product) => product.id === id
      );
      patchState(store, { products: actualizaProducts });
    },

    limpiarCart() {
      patchState(store, inicialState);
    },
  }))
);

//acc es un acomulador de reduce, esto suma la cantidad de objetos en el array 
function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0);
}

//toma la cantidad de cada producto acomulado, luego toma ese precio y lo multiplica por la cantidad
function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0);
}
