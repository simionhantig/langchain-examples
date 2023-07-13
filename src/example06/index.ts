import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

// EXAMPLE DESCRIPTION: Multiple ways to use a Chat model

dotenv.config();

const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

async function sendHumanMessage() {
  const res = await chat.call([
    new HumanChatMessage(
      "Translate this sentence from English to Romanian. I love programming."
    ),
  ]);

  console.log("Response from Human message");
  console.log(res);
}

sendHumanMessage().catch((error) => {
  console.log(error);
  process.exit(1);
});

async function sendSystemAndHumanMessage() {
  const res = await chat.call([
    new SystemChatMessage(
      "You are a helpful assitant that translates from English to Romanian."
    ),
    new HumanChatMessage("Translate: I love programming."),
  ]);

  console.log("Response from System and Human messages");
  console.log(res);
}

sendSystemAndHumanMessage().catch((error) => {
  console.log(error);
  process.exit(1);
});

async function sendMultipleMessages() {
  const res = await chat.generate([
    [
      new SystemChatMessage(
        "You are a helpful assitant that translates from English to Romanian."
      ),
      new HumanChatMessage("Translate: I love programming."),
    ],
    [
      new SystemChatMessage(
        "You are a helpful assitant that translates from English to French."
      ),
      new HumanChatMessage("Translate: I love artificial intelligence."),
    ],
  ]);

  console.log("Response from multiple messages");
  console.log(JSON.stringify(res, null, 2));
}

sendMultipleMessages().catch((error) => {
  console.log(error);
  process.exit(1);
});
