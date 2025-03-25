import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { MachineSnapshot } from '../api/v1';
import { environment } from 'src/environments/environment';

export interface SocketState {
  lastMachineSnapshot: MachineSnapshot;
}
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // state
  private state = signal<SocketState>({
    lastMachineSnapshot: {},
  });

  // selectors
  lastMachineSnapshot = computed(() => this.state().lastMachineSnapshot);

  // sources
  private machineSocket$ = webSocket<MachineSnapshot>(
    `ws://${environment.tabletIP}/ws/v1/de1/snapshot`
  );

  constructor() {
    // reducers
    this.machineSocket$
      .asObservable()
      .pipe(
        takeUntilDestroyed(),
        tap((snapshot) => console.log('Snapshot received:', snapshot)),
        catchError((error) => {
          console.error('Error receiving snapshot:', error);
          return EMPTY;
        })
      )
      .subscribe((snapshot: MachineSnapshot) => {
        this.state.update((state) => ({
          ...state,
          lastMachineSnapshot: snapshot,
        }));
      });
  }

  ngOnDestroy() {
    this.machineSocket$.complete();
  }
}
