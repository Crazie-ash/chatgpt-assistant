import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { TranscriptionService } from '../services/TranscriptionService';

export class RecordingsController {
  private transcriptionService: TranscriptionService;

  constructor() {
    this.transcriptionService = new TranscriptionService();
  }

  createTranscription = async (req: Request, res: Response) => {
    try {
      const { filename } = req.file;
      let files = fs.readdirSync(path.join(__dirname, '../../uploads'));
      const lastFile = files[files.length - 1];
      const transcription: any = await this.transcriptionService.transcribeAudio(lastFile);
      console.log('Transcription:', transcription);

      await this.transcriptionService.generateTextToSpeech(transcription.transcript);
      const txtPath = path.join(__dirname, '../../uploads', `${filename.replace('.mp3', '-prompt.txt')}`);
      fs.writeFileSync(txtPath, transcription.transcript);

  
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  getRecordings = async (req: Request, res: Response) => {
    try {
      const filesTexts = fs.readdirSync(path.join(__dirname, '../../uploads'));

      const files = filesTexts
        .filter((file) => file.endsWith('gen.mp3'))
        .map((file) => `/${file}`);

      const prompts = filesTexts
        .filter((file) => file.endsWith('prompt.txt'))
        .map((txt) => fs.readFileSync(path.join(__dirname, '../../uploads', txt), 'utf8'));

      const responses = filesTexts
        .filter((file) => file.endsWith('gen.txt'))
        .map((txt) => fs.readFileSync(path.join(__dirname, '../../uploads', txt), 'utf8'));

      return res.json({ success: true, files, prompts, responses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}
