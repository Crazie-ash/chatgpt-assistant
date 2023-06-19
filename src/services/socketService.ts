import { OpenAIService } from './OpenAIService';

export class SocketService {
    private openAIService: OpenAIService;
    constructor() {
        this.openAIService = new OpenAIService();
    }
    async socketHandling(event) {

        switch (event.type) {
            default:
                console.log(event.type);
                break;
        }
    }
}
