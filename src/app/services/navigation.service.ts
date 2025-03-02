import { NavComponent } from '@ionic/core';
import { IonNav } from '@ionic/angular/standalone';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public nav = signal<IonNav | undefined>(undefined);

  setRoot(page: NavComponent) {
    this.nav()?.setRoot(page);
  }

  pushPage(page: NavComponent) {
    this.nav()?.push(page);
  }

  popPage() {
    this.nav()?.pop();
  }

  popToRoot() {
    this.nav()?.popToRoot();
  }
}
