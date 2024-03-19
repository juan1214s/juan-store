import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorResponseInterceptor } from '@shared/interceptors/error-response.interceptor';
import { spinerInterceptor } from '@shared/interceptors/spiner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations (),
    //esto muestra el mensaje del toast
    provideToastr({ timeOut: 900, preventDuplicates: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      //con este modulo puedo interceptar las perticiones y despues llamar las funciones 
      withInterceptors([errorResponseInterceptor, spinerInterceptor])
      )
  ]
};
