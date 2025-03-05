import { Injectable, resource } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Profile } from '../api/v1';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Last profile
  private readonly LAST_PROFILE_VALUE = 'lastProfile';
  loadLastProfile() {
    return resource({
      loader: () =>
        Preferences.get({ key: this.LAST_PROFILE_VALUE }).then((profile) => {
          return profile?.value ? JSON.parse(profile.value) : undefined;
        }),
    });
  }

  saveLastProfile(profile: Profile) {
    Preferences.set({
      key: this.LAST_PROFILE_VALUE,
      value: JSON.stringify(profile),
    });
  }
}
