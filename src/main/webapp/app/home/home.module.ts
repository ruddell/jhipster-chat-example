import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [ChatSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class ChatHomeModule {}
