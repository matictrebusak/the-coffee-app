import { NavigationService } from './../../services/navigation.service';
import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { sprintf } from 'sprintf-js';
import { TranslatePipe } from '@ngx-translate/core';
import FlowStep2Page from '../flow-step-2/flow-step-2.page';

@Component({
  selector: 'app-flow-step-1',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ 'FLOW_STEP_1.TITLE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="">
        {{
          sprintf(
            'FLOW_STEP_1.DESCRIPTION' | translate,
            coffeeWeight(),
            grinderSetting()
          )
        }}
      </div>
      <ion-button (click)="continue()">{{
        'FLOW_STEP_1.BUTTON_CONTINUE' | translate
      }}</ion-button>
    </ion-content>
  `,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    TranslatePipe,
  ],
})
export default class FlowStep1Page {
  navigation = inject(NavigationService);
  sprintf = sprintf;

  coffeeWeight = signal<number>(15);
  grinderSetting = signal<number>(1.5);

  continue() {
    this.navigation.pushPage(FlowStep2Page);
  }
}
