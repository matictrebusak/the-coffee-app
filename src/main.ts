import { bootstrapApplication } from '@angular/platform-browser';

import { provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { provideApi } from './app/api.provider';

bootstrapApplication(AppComponent, {
  providers: [provideIonicAngular(), provideApi()],
});
