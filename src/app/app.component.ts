import { Component, effect, inject, viewChild } from '@angular/core';
import { IonApp, IonNav } from '@ionic/angular/standalone';
import { NavigationService } from './services/navigation.service';
import HomePage from './pages/home/home.page';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-nav />
    </ion-app>
  `,
  imports: [IonApp, IonNav],
})
export class AppComponent {
  navigation = inject(NavigationService);
  nav = viewChild(IonNav);

  constructor() {
    effect(() => {
      this.navigation.nav.set(this.nav());
      this.navigation.setRoot(HomePage);
    });
  }
}
