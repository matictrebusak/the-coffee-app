import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import { Profile } from '../api/v1';

@Injectable({
  providedIn: 'root',
})
export class FilePickerService {
  openJsonFile(): Observable<Profile> {
    return from(
      FilePicker.pickFiles({
        limit: 1,
        types: ['application/json'],
        readData: true,
      })
    ).pipe(
      map((result) => result?.files?.[0]?.data ?? ''),
      map((data) => atob(data)), // Convert base64 to readable json
      map((json) => JSON.parse(json) as Profile),
      catchError((error) => {
        console.error('Error opening profile json file', error);
        return EMPTY;
      })
    );
  }
}
