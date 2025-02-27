import { Profile } from './../../api/v1/model/profile';
import { Component, effect, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import {
  De1StateGet200Response,
  DefaultService,
  DevicesGet200ResponseInner,
} from '../../api/v1';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FilePickerService } from 'src/app/services/file-picker.service';

interface HomeState {
  devices: DevicesGet200ResponseInner[];
  de1state: De1StateGet200Response;
}

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
        <ion-button (click)="open()">Load profile s</ion-button>
      </div>
    </ion-content>
  `,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export default class HomePage {
  api = inject(DefaultService);
  filePicker = inject(FilePickerService);
  devices = toSignal(this.api.devicesGet());

  // state
  state = signal({});

  // selectors

  // sources
  // loadDevices$ = this.api.devicesGet();

  constructor() {
    effect(() => console.log(this.devices()));
  }

  open() {
    this.filePicker
      .openJsonFile()
      .subscribe((profile: Profile) => console.log('Profile', profile));
  }
}
