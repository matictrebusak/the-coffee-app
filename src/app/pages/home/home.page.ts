import { Component, inject, viewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

import { ApiService } from 'src/app/services/api.service';
import FlowStep1PrepareCoffeePage from '../flow-step-1-prepare-coffee/flow-step-1-prepare-coffee.page';
import { NavigationService } from 'src/app/services/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { FlowService } from 'src/app/services/flow.service';
import { JsonPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

interface SettingOption {
  label: string;
  action: () => void;
}

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>{{ 'HOME.TITLE' | translate }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="openSettings()">
            <ion-icon name="settings-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div id="container">
        <div class="p-3">DE1 state: {{ api.de1State() | json }}</div>
        <div class="p-3">Devices: {{ api.devices() | json }}</div>

        @if (flowService.profile(); as profile) {
        <div class="p-3">
          Current profile: {{ profile.title }} by {{ profile.author }}
        </div>
        }

        <ion-button (click)="flowService.changeProfile$.next()"
          >Change profile</ion-button
        >
        <ion-button (click)="flowService.resetProfile$.next()"
          >Reset profile</ion-button
        >
        <ion-button (click)="continue()">Next Page</ion-button>
      </div>
    </ion-content>
  `,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    TranslateModule,
    JsonPipe,
    IonButtons,
    IonIcon,
  ],
})
export default class HomePage {
  flowService = inject(FlowService);
  api = inject(ApiService);
  navigation = inject(NavigationService);

  options: SettingOption[] = [
    {
      label: 'Change profile',
      action: () => this.flowService.changeProfile$.next(),
    },
    {
      label: 'Default profile',
      action: () => this.flowService.resetProfile$.next(),
    },
  ];

  constructor() {
    addIcons({ settingsOutline });
  }

  openSettings() {
    console.log('TODO');
  }

  continue() {
    this.navigation.pushPage(FlowStep1PrepareCoffeePage);
  }
}
