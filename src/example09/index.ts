import * as dotenv from "dotenv";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models";
import { BufferMemory } from "langchain/memory";

// EXAMPLE DESCRIPTION: Use Memory for Chat Chains

dotenv.config();

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "The following is a friendly conversation between a human and an AI. " +
      "The AI is talkative and provide lots of specific details from its context. " +
      "If the AI does not know the answer to a question, it thrutfully says it does not know."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  }),
  prompt,
  llm: chat,
});

async function testMemoryInConversationChain() {
  let res = await chain.call({
    input: "Hi from London, how are you doing today?",
  });

  console.log(res);

  res = await chain.call({
    input: "Do you know where I am?",
  });

  console.log(res);
}

testMemoryInConversationChain().catch((error) => {
  console.log(error);
  process.exit(1);
});
