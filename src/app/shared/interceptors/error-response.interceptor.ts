import { HttpErrorResponse, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

//cada vez q el usuario haga una petici esto la va interceptar y mirara si hay errores
export const errorResponseInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,//inica q req es un objeto de tipo HttpRequest que puede contener cualquier tipo de cuerpo (unknown en este caso).
     next: HttpHandlerFn
     ) => next(req)
.pipe(catchError(errorResponse))

//indica q se recibe un error q la funcion espera un error de tipo de throwError
function errorResponse(error: HttpErrorResponse): ReturnType<typeof throwError>{
    const errorResponse = `Error en el codigo: ${error.status}, message: ${error.message}`;
    return throwError(()=> errorResponse)
}