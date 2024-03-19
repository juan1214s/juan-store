import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core"
import { SpinerServiceTsService } from "@shared/services/spiner.service.ts.service"
import { finalize } from "rxjs";



export const spinerInterceptor: HttpInterceptorFn = ( req, next ) => {
    const spinerSvc = inject(SpinerServiceTsService);

    //intercepta las peticiones y muestra el spiner, cuando la peticion se resuelva lo oculto
    spinerSvc.show();
    return next(req).pipe(
        finalize(()=> spinerSvc.hide())
    )
}