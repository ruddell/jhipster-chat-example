import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ChatService } from 'app/shared/chat/chat.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  messages: Array<Object> = [];
  message = '';

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private chatService: ChatService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.chatService.connect();

    this.chatService.receive().subscribe(message => {
      this.messages.push(message);
    });

    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.registerLogoutSuccess();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
        this.chatService.disconnect();
        this.chatService.connect();
      });
    });
  }

  registerLogoutSuccess() {
    this.eventManager.subscribe('logoutSuccess', message => {
      this.chatService.disconnect();
      this.chatService.connect();
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }

  sendMessage(message) {
    if (message.length === 0) {
      return;
    }

    this.chatService.sendMessage(message);
    this.message = '';
  }
}
