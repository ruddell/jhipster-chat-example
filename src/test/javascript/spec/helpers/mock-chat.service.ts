import { SpyObject } from './spyobject';
import { ChatService } from '../../../../main/webapp/app/shared/chat/chat.service';

export class MockChatService extends SpyObject {
  constructor() {
    super(ChatService);
  }

  connect() {}
}
