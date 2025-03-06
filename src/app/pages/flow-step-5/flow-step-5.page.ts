import { NavigationService } from '../../services/navigation.service';
import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { sprintf } from 'sprintf-js';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-flow-step-5',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>{{ 'FLOW_STEP_5.TITLE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="">
        {{ 'FLOW_STEP_5.DESCRIPTION' | translate }}
      </div>
      <ion-button (click)="backToStart()">{{
        'FLOW_STEP_5.BUTTON_BACK_TO_START' | translate
      }}</ion-button>
      <ion-button (click)="anotherOne()">{{
        'FLOW_STEP_5.BUTTON_ANOTHER_ONE' | translate
      }}</ion-button>
      <ion-button (click)="addSteamMilk()">{{
        'FLOW_STEP_5.BUTTON_ADD_STEAM_MILK' | translate
      }}</ion-button>
    </ion-content>
  `,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    TranslatePipe,
  ],
})
export default class FlowStep5Page {
  navigation = inject(NavigationService);
  sprintf = sprintf;

  backToStart() {
    this.navigation.popToRoot();
  }

  anotherOne() {
    this.navigation.popToIndex(1);
  }

  addSteamMilk() {
    console.log('Where to, young traveller?');
  }
}
