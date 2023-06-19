import { OpenAIApi, Configuration } from 'openai';
import { GTTSWrapper } from '../utils/GTTSWrapper';
import { saveTextToSpeech } from './gttsService';
import * as path from 'path';
import * as fs from 'fs';
import { OpenAI } from "langchain/llms/openai";
import { io } from '../app';

export class OpenAIService {
    private openai: OpenAIApi;
    private tokens: string = '';
    private model: OpenAI;


    constructor() {
        this.openai = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        }));
        this.tokens = '';
        this.model = new OpenAI({
            streaming: true,
            maxTokens: 3000,
            callbacks: [
                {
                    handleLLMError(err: Error) {
                        console.log(err.message);
                    },
                    handleLLMNewToken(token: string) {
                        console.log(token);
                        if (!this.tokens) {
                            this.tokens = '';
                        }
                        this.tokens += token;
                        io.emit('message', token);
                    },
                    async handleLLMEnd() {
                        await saveTextToSpeech(this.tokens).then(result => {
                            io.emit('converted');
                            this.tokens = ""
                        }).catch(err => {
                            if (err) { throw new Error(err); }
                        });
                    },
                },
            ],
        })
    }

    async createTranscription(filename, model): Promise<any> {
        io.emit('generating');
        const filePath = path.join(__dirname, '../../uploads', filename);
        const fileStream = fs.createReadStream(filePath);
        const transcript = await this.openai.createTranscription(fileStream as any, model);
        this.model.call(transcript.data.text)
        return { transcript: transcript.data.text };
    }

    async saveGTTS(): Promise<void> {
        const gtts = new GTTSWrapper(this.tokens, 'en');

        const files = fs.readdirSync(path.join(__dirname, '../../uploads'));
        const lastFile = files[files.length - 1];

        const outputPath = path.join(__dirname, '../../uploads', `${lastFile.replace('.mp3', '-gen.mp3')}`);

        await gtts.save(outputPath);

        this.tokens = '';
        console.log('saveGTTS: Text to speech converted!');
    }
}
