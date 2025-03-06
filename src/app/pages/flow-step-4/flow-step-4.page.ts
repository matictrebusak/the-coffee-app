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
import FlowStep5Page from '../flow-step-5/flow-step-5.page';

@Component({
  selector: 'app-flow-step-4',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ 'FLOW_STEP_4.TITLE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="">
        {{ 'FLOW_STEP_4.DESCRIPTION' | translate }}
      </div>
      <ion-button (click)="continue()">{{
        'FLOW_STEP_4.BUTTON_CONTINUE' | translate
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
export default class FlowStep4Page {
  navigation = inject(NavigationService);
  sprintf = sprintf;

  continue() {
    this.navigation.pushPage(FlowStep5Page);
  }
}
