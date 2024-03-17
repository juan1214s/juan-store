import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        //esto devuelve una promesa q se ahorra poniendo el default en el component
        path: '', loadComponent: ()=> import('./products.component')
    },
    {
        //esto devuelve una promesa q se ahorra poniendo el default en el component
        path: ':id', loadComponent: ()=> import('./details/details.component')
    }
        
];

export default routes;