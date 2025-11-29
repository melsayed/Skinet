import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    /*
    provideAppInitializer بيحتاج Promise
علشان يوقف تشغيل التطبيق لحد لما الـ promise يخلص.
----------------
lastValueFrom(observable)
بتحوّل Observable → Promise
----------------
HTTP request نوعه finite observable (بينتهي بعد رد واحد)
→ فالـ lastValueFrom = firstValueFrom = نفس النتيجة في الحالة دي. 
لكن lastValueFrom آمن أكتر لو observable بيرجع أكتر من قيمة.
    */
    provideAppInitializer(async () => {
      //App initialization logic can go here
      const initService = inject(InitService);
      return lastValueFrom(initService.init()).finally(() => {
        const splash = document.getElementById('initial-splash');
        if (splash) {
          splash.remove();
        }
      });
    })
  ]
};
