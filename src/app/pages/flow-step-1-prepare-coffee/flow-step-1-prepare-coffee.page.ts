import { NavigationService } from './../../services/navigation.service';
import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-flow-step-1-prepare-coffee',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Step 1: Prepare the coffee</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="">Prepare the coffe: measure 18g of coffee into cup.</div>
      <ion-button (click)="continue()">Step 2</ion-button>
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
  ],
})
export default class FlowStep1PrepareCoffeePage {
  navigation = inject(NavigationService);

  continue() {
    this.navigation.pushPage(FlowStep1PrepareCoffeePage);
  }
}
