import { NgModule } from '@angular/core';

import { ChatSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ChatSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ChatSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ChatSharedCommonModule {}
