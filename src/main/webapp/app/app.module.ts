import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ChatSharedModule } from 'app/shared/shared.module';
import { ChatCoreModule } from 'app/core/core.module';
import { ChatAppRoutingModule } from './app-routing.module';
import { ChatHomeModule } from './home/home.module';
import { ChatEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ChatSharedModule,
    ChatCoreModule,
    ChatHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ChatEntityModule,
    ChatAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class ChatAppModule {}
