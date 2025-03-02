import { Component, effect, inject, viewChild } from '@angular/core';
import { IonApp, IonNav } from '@ionic/angular/standalone';
import { NavigationService } from './services/navigation.service';
import HomePage from './pages/home/home.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-nav />
    </ion-app>
  `,
  imports: [IonApp, IonNav, TranslateModule],
})
export class AppComponent {
  private translate = inject(TranslateService);
  private navigation = inject(NavigationService);

  private nav = viewChild(IonNav);

  constructor() {
    effect(() => {
      this.navigation.nav.set(this.nav());
      this.navigation.setRoot(HomePage);
    });

    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
