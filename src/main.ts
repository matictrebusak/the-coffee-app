import { bootstrapApplication } from '@angular/platform-browser';

import { provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { provideApi } from './app/api.provider';
import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from './environments/environment';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './assets/l10n/', '.json');

const config: SocketIoConfig = {
  url: environment.tabletIP + '/ws/v1/de1/snapshot',
  options: {},
};

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideApi(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      SocketIoModule.forRoot(config),
    ]),
  ],
});
