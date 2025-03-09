import { Injectable, resource, ResourceRef } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Profile } from '../api/v1';
import * as defaultProfile from '../../assets/profiles/pressurizedBloom.json';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Last profile
  private readonly LAST_PROFILE_VALUE = 'lastProfile';
  loadLastProfile(): ResourceRef<Profile> {
    return resource({
      loader: () =>
        Preferences.get({ key: this.LAST_PROFILE_VALUE }).then((profile) =>
          profile?.value ? JSON.parse(profile.value) : defaultProfile
        ),
    });
  }

  saveLastProfile(profile: Profile) {
    Preferences.set({
      key: this.LAST_PROFILE_VALUE,
      value: JSON.stringify(profile),
    });
  }
}
