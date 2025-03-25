import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/ws/v1/de1/snapshot');
  }

  // Receive messages from the server
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Close the WebSocket connection
  closeConnection() {
    this.socket$.complete();
  }
}
