import { computed, inject, Injectable, signal } from '@angular/core';
import {
  MachineSnapshot,
  DefaultService,
  DevicesGet200ResponseInner,
} from '../api/v1';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  concatMap,
  EMPTY,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

export interface ApiState {
  devices: DevicesGet200ResponseInner[];
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
      this.defaultService.devicesGet().pipe(
        catchError((error) => {
          console.error('Error loading devices:', error);
          return EMPTY;
        })
      )
    )
  );
  private de1StateLoaded$ = this.defaultService.de1StateGet();

  constructor() {
    // reducers
    this.devicesLoaded$.pipe(takeUntilDestroyed()).subscribe((devices) => {
      this.state.update((state) => ({ ...state, devices }));
    });

    this.de1StateLoaded$.pipe(takeUntilDestroyed()).subscribe((de1State) => {
      this.state.update((state) => ({ ...state, de1State }));
    });
  }
}
