import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import FlowStep1 from '../flow-step-1/flow-step-1.page';
import { NavigationService } from 'src/app/services/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { FlowService } from 'src/app/services/flow.service';
import { JsonPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { SocketService } from 'src/app/services/socket.service';

interface SettingOption {
  label: string;
  action: () => void;
}

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      <div>
        <div class="p-3 flex flex-col">
          <p>{{ 'HOME.MACHINE' | translate }}:</p>
          <p>{{ api.de1State() | json }}</p>
        </div>
        <div class="p-3 flex flex-col">
          <p class="">{{ 'HOME.SCALE' | translate }}:</p>
          <pre>{{ api.devices() | json }}</pre>
          @if (api.devices().length > 1) {
            <p class="">{{ 'HOME.SCALE_READY' | translate }}</p>
          } @else {
            <p
              (click)="api.refreshDevices$.next()"
              [innerHTML]="'HOME.SCALE_TURN_ON' | translate"
            ></p>
          }
        </div>
      </div>

      @if (flowService.profile(); as profile) {
        <div class="p-3 flex flex-col">
          <p>{{ 'HOME.CURRENT_PROFILE' | translate }}</p>
          <p>{{ profile.title }} by {{ profile.author }}</p>
        </div>
      }

      <div class="flex flex-col w-[200px] pt-8 mx-auto">
        <ion-button (click)="flowService.changeProfile$.next()">{{
          'HOME.BUTTON_CHANGE_PROFILE' | translate
        }}</ion-button>
        <ion-button (click)="flowService.resetProfile$.next()">{{
          'HOME.BUTTON_RESET_PROFILE' | translate
        }}</ion-button>
        <ion-button (click)="continue()">{{
          'HOME.BUTTON_CONTINUE' | translate
        }}</ion-button>
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
  socketService = inject(SocketService);

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
    this.api.uploadProfile$.next(this.flowService.profile());
    this.navigation.pushPage(FlowStep1);
  }
}
