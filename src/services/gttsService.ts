import * as path from 'path';
import * as fs from 'fs';
import * as  gTTS from "gtts";

export const saveTextToSpeech = (tokens: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(tokens, 'en');


    const files = fs.readdirSync(path.join(__dirname, '../../uploads'));
    const lastFile = files[files.length - 1];
    const responsePath = path.join(__dirname, '../../uploads', `${lastFile.replace('.mp3', '-gen.txt')}`);
    fs.writeFileSync(responsePath, tokens);
    gtts.save(path.join(__dirname, '../../uploads', lastFile.replace('.mp3', '-gen.mp3')), (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log('saveTextToSpeech: Text to speech converted!');
        resolve();
      }
    });
  });
};
