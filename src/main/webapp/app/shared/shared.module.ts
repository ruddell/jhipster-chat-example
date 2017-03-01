import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ChatSharedLibsModule, ChatSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, ChatService } from './';

@NgModule({
    imports: [ChatSharedLibsModule, ChatSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }, ChatService],
    entryComponents: [JhiLoginModalComponent],
    exports: [ChatSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatSharedModule {
    static forRoot() {
        return {
            ngModule: ChatSharedModule
        };
    }
}
