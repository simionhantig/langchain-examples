import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// EXAMPLE DESCRIPTION: Use Chat Prompt Templates and LLMChains

dotenv.config();

const chat = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "You are a helpful assitant that translates {inputLanguage} to {outputLanguage}."
  ),
  HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

async function callChatUsingPrompt() {
  const res = await chat.generatePrompt([
    await prompt.formatPromptValue({
      inputLanguage: "English",
      outputLanguage: "French",
      text: "I love programming.",
    }),
  ]);

  console.log(JSON.stringify(res, null, 2));
}

callChatUsingPrompt().catch((error) => {
  console.log(error);
  process.exit(1);
});

const chain = new LLMChain({
  prompt,
  llm: chat,
});

async function callChainUsingPrompt() {
  const res = await chain.call({
    inputLanguage: "English",
    outputLanguage: "Romanian",
    text: "I love artificial intelligence.",
  });

  console.log(JSON.stringify(res, null, 2));
}

callChainUsingPrompt().catch((error) => {
  console.log(error);
  process.exit(1);
});
