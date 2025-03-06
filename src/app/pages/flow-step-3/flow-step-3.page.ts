import { NavigationService } from '../../services/navigation.service';
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
import FlowStep4Page from '../flow-step-4/flow-step-4.page';

@Component({
  selector: 'app-flow-step-3',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ 'FLOW_STEP_3.TITLE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="">
        {{ 'FLOW_STEP_3.DESCRIPTION' | translate }}
      </div>
      <ion-button (click)="continue()">{{
        'FLOW_STEP_3.BUTTON_CONTINUE' | translate
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
export default class FlowStep3Page {
  navigation = inject(NavigationService);
  sprintf = sprintf;

  continue() {
    this.navigation.pushPage(FlowStep4Page);
  }
}
