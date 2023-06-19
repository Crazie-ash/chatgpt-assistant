import * as path from 'path';
import * as fs from 'fs';
import { OpenAIService } from './OpenAIService';
import { GTTSWrapper } from '../utils/GTTSWrapper';

export class TranscriptionService {
    private openAIService: OpenAIService;
    private tokens: string;

    constructor() {
        this.openAIService = new OpenAIService();
        this.tokens = '';
    }

    async transcribeAudio(filename: string): Promise<string> {
        const transcription = await this.openAIService.createTranscription(filename, 'whisper-1');
        return transcription;
    }

    async generateTextToSpeech(tokens: string): Promise<void> {
        const gtts = new GTTSWrapper(tokens, 'en');

        const files = fs.readdirSync(path.join(__dirname, '../../uploads'));
        const lastFile = files[files.length - 1];

        const outputPath = path.join(__dirname, '../../uploads', `${lastFile.replace('.mp3', '-gen.mp3')}`);

        await gtts.save(outputPath);

        console.log('generateTextToSpeech: Text to speech converted!');
    }

    getTokens(): string {
        return this.tokens;
    }
}
