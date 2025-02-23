import { Component, effect, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { DefaultService } from '../api/v1';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <div class="text-red-500">Test</div>
      </div>
    </ion-content>
  `,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export default class HomePage {
  api = inject(DefaultService);
  devices = toSignal(this.api.devicesGet());

  constructor() {
    effect(() => console.log(this.devices()));
  }
}
