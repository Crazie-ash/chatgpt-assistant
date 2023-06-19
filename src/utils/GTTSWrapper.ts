import  * as  gTTS from "gtts"

export class GTTSWrapper {
  private tokens: string;
  private language: string;

  constructor(tokens: string, language: string) {
    this.tokens = tokens;
    this.language = language;
  }

  async save(outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const gtts = new gTTS(this.tokens, this.language);
      gtts.save(outputPath, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
