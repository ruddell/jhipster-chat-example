import { Injectable, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

import { CSRFService } from '../auth/csrf.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';

import SockJS = require('sockjs-client');
import Stomp = require('webstomp-client');

@Injectable()
export class ChatService {
    stompClient = null;
    subscriber = null;
    connection: Promise<any>;
    connectedPromise: any;
    listener: Observable<any>;
    listenerObserver: Observer<any>;
    alreadyConnectedOnce= false;
    private subscription: Subscription;

    constructor(
        private router: Router,
        private authServerProvider: AuthServerProvider,
        private $document: Document,
        private $window: Window,
        private csrfService: CSRFService
    ) {
        this.connection = this.createConnection();
        this.listener = this.createListener();
    }

    connect () {
        if (this.connectedPromise === null) {
          this.connection = this.createConnection();
        }
        // building absolute path so that websocket doesnt fail when deploying with a context path
        const loc = this.$window.location;
        let url = '//' + loc.host + loc.pathname + 'websocket/chat';
        const authToken = this.authServerProvider.getToken();
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket);
        let headers = {};
        this.stompClient.connect(headers, () => {
            this.connectedPromise('success');
            this.connectedPromise = null;
            this.subscribe();
            if (!this.alreadyConnectedOnce) {
                this.alreadyConnectedOnce = true;
            }
        });
    }

    disconnect () {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.alreadyConnectedOnce = false;
    }

    receive () {
        return this.listener;
    }

    sendMessage(message) {
        if (this.stompClient !== null && this.stompClient.connected) {
            this.stompClient.send(
                '/chat', // destination
                JSON.stringify({'message': message}), // body
                {} // header
            );
        }
    }

    subscribe () {
        this.connection.then(() => {
            this.subscriber = this.stompClient.subscribe('/chat/public', data => {
                this.listenerObserver.next(JSON.parse(data.body));
            });
        });
    }

    unsubscribe () {
        if (this.subscriber !== null) {
            this.subscriber.unsubscribe();
        }
        this.listener = this.createListener();
    }

    private createListener(): Observable<any> {
        return new Observable(observer => {
            this.listenerObserver = observer;
        });
    }

    private createConnection(): Promise<any> {
        return new Promise((resolve, reject) => this.connectedPromise = resolve);
    }
}
