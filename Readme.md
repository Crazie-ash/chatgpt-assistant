# AI Voice Assistant with ChatGPT OpenAI API

This is a simple AI Voice Assistant built using Node.js and the ChatGPT OpenAI API. It generates AI responses based on user input and converts them to speech using text-to-speech (TTS) technology.

## Prerequisites

- Node.js installed on your system
- OpenAI API key (sign up and obtain the key from OpenAI)

## Installation

1. Clone the repository or download the source code.

2. Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. Set up OpenAI API:

   - Open the `.env` file and replace `YOUR_OPENAI_API_KEY` with your actual API key obtained from OpenAI.

4. Start the application:

   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.

2. Speak or enter your text input in the chat interface.

3. The AI Voice Assistant will generate a response based on your input.

4. The generated response will be converted to speech and played back to you.

## Configuration

- You can modify the AI model and TTS settings in the code.
- The OpenAI API key is read from the `.env` file. Make sure to keep this file secure and never share your API key.

## Acknowledgements

- This project utilizes the ChatGPT OpenAI API for generating AI responses.
- The text-to-speech (TTS) functionality is powered by the gTTS library.

## Notes

- Remember to comply with the OpenAI usage policies and guidelines when using the OpenAI API.
- Make sure to handle any errors or exceptions gracefully and provide appropriate error handling mechanisms in the code.

Feel free to modify and enhance this README according to your specific project requirements and additional features you implement.

Happy coding!
