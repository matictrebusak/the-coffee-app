import {
  Injectable,
  ResourceStatus,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';
import { FilePickerService } from './file-picker.service';
import * as defaultProfile from '../../assets/profiles/pressurizedBloom.json';
import { Profile } from '../api/v1';

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
  profile: WritableSignal<Profile> = this.storage.loadLastProfile().value;

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
