import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        //esto devuelve una promesa q se ahorra poniendo el default en el component
        path: 'products', loadComponent: ()=> import('./features/products/products.component')
    },
    {
        //esto devuelve una promesa q se ahorra poniendo el default en el component
        path: 'products-details/:id', loadComponent: ()=> import('./features/products/details/details.component')
    },
    {
        //esto devuelve una promesa q se ahorra poniendo el default en el component
        path: 'checkout', loadComponent: ()=> import('./features/checkout/checkout.component')
    },
    //si pongo una ruta q no existe me redirige a products
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: '**', redirectTo: 'products', pathMatch: 'full'}
        
];
