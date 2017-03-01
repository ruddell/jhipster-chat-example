import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';
import { ChatService } from '../shared';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    messages: Array<Object> = [];
    message = '';

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private chatService: ChatService
    ) {
        }

    ngOnInit() {
        this.chatService.connect();

        this.chatService.receive().subscribe(message => {
            this.messages.push(message);
        });

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.registerLogoutSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.chatService.disconnect();
                this.chatService.connect();
            });
        });
    }
    registerLogoutSuccess() {
        this.eventManager.subscribe('logoutSuccess', (message) => {
            this.chatService.disconnect();
            this.chatService.connect();
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    sendMessage(message) {
        if (message.length === 0) {
            return;
        }
        this.chatService.sendMessage(message);
        this.message = '';
    }
}
