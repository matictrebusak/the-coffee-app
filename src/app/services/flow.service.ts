import { Injectable, effect, inject } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';
import { FilePickerService } from './file-picker.service';
import * as defaultProfile from '../../assets/profiles/pressurizedBloom.json';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  storage = inject(StorageService);
  filepicker = inject(FilePickerService);

  // sources
  changeProfile$ = new Subject<void>();
  resetProfile$ = new Subject<void>();

  // selectors
  profile = this.storage.loadLastProfile().value ?? defaultProfile;

  constructor() {
    // reducers
    this.changeProfile$
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this.filepicker.openJsonFile())
      )
      .subscribe((profile) => {
        if (this.profile) {
          this.profile.set(profile);
        } else {
          console.log('No profile to set');
        }
      });

    this.resetProfile$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.profile.set(defaultProfile);
    });

    // effects
    effect(() => {
      const profile = this.profile();
      if (profile) {
        this.storage.saveLastProfile(profile);
      }
    });
  }
}
