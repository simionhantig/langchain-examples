import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

// EXAMPLE DESCRIPTION: Add Memory to Chains and Agents

dotenv.config();

const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory });

async function callChainWithMemory() {
  let res = await chain.call({ input: "Hi! I'm Simi." });
  console.log(res);

  res = await chain.call({ input: "What's my name?" });
  console.log(res);
}

callChainWithMemory().catch((error) => {
  console.log(error);
  process.exit(1);
});
