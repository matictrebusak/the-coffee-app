import { effect, computed, inject, Injectable, signal } from '@angular/core';
import {
  MachineSnapshot,
  DefaultService,
  Profile,
  ApiV1DevicesGet200ResponseInner,
} from '../api/v1';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  EMPTY,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';

export interface ApiState {
  devices: ApiV1DevicesGet200ResponseInner[];
  de1State: MachineSnapshot;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private defaultService = inject(DefaultService);

  // state
  private state = signal<ApiState>({
    devices: [],
    de1State: {},
  });

  // selectors
  de1State = computed(() => this.state().de1State?.state?.state);
  devices = computed(() => this.state().devices);

  // sources
  refreshDevices$ = new Subject<void>();
  private devicesLoaded$ = this.refreshDevices$.pipe(
    startWith(undefined), // Trigger the initial load
    tap(() => console.log('Refreshing devices...')),
    switchMap(() =>
      this.defaultService.apiV1DevicesScanGet().pipe(
        catchError((error) => {
          console.error('Error loading devices:', error);
          return EMPTY;
        }),
        switchMap(() => timer(5000)),
        switchMap(() =>
          this.defaultService.apiV1DevicesGet().pipe(
            tap(() => console.log('Devices fetched after scan')),
            // tap((devices) => {
            //   console.log('Fresh devices: ', devices);
            //   this.state.update((state) => ({ ...state, devices }));
            // }),
            catchError((error) => {
              console.error('Error fetching devices:', error);
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  );
  private de1StateLoaded$ = this.defaultService.apiV1De1StateGet();
  uploadProfile$ = new Subject<Profile>();

  constructor() {
    // reducers
    this.devicesLoaded$.pipe(takeUntilDestroyed()).subscribe((devices) => {
      console.log('Final devices:', devices)
      this.state.update((state) => ({ ...state, devices }));
    });

    this.de1StateLoaded$.pipe(takeUntilDestroyed()).subscribe((de1State) => {
      this.state.update((state) => ({ ...state, de1State }));
    });

    this.uploadProfile$
      .pipe(
        takeUntilDestroyed(),
        tap(() => console.log('Uploading profile...')),
        switchMap((profile) =>
          this.defaultService.apiV1De1ProfilePost(profile).pipe(
            catchError((error) => {
              console.error('Error posting profile:', error);
              return EMPTY;
            }),
          ),
        ),
        tap(() => console.log('Profile posted')),
      )
      .subscribe(() => {});
    effect(() => {
    const devices = this.devices();
    console.log('🛰️ UI-observable devices changed:', devices);
  });
  }
}
