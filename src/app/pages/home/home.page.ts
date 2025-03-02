import { Profile } from './../../api/v1/model/profile';
import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';

import { FilePickerService } from 'src/app/services/file-picker.service';
import { ApiService } from 'src/app/services/api.service';
import FlowStep1PrepareCoffeePage from '../flow-step-1-prepare-coffee/flow-step-1-prepare-coffee.page';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div id="container">
        <div class="p-3">DE1 state: {{ api.de1State() }}</div>
        <div class="p-3">Devices: {{ api.devices() }}</div>

        <ion-button (click)="open()">Load profile s</ion-button>
        <ion-button (click)="continue()">Next Page</ion-button>
      </div>
    </ion-content>
  `,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export default class HomePage {
  filePicker = inject(FilePickerService);
  navigation = inject(NavigationService);
  api = inject(ApiService);

  open() {
    this.filePicker
      .openJsonFile()
      .subscribe((profile: Profile) => console.log('Profile', profile));
  }

  continue() {
    this.navigation.pushPage(FlowStep1PrepareCoffeePage);
  }
}
