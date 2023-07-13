import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models";
import { AgentExecutor, ChatAgent } from "langchain/agents";
import { SerpAPI } from "langchain/tools";

// EXAMPLE DESCRIPTION: Use Chat Agent, Agent Executor and Tools

dotenv.config();

const tools = [
  new SerpAPI(process.env.SERP_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
];

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const agent = ChatAgent.fromLLMAndTools(chat, tools);

const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

async function runExecutor() {
  const res = await executor.run("How many people live in Canada as of 2023?");

  console.log(res);
}

runExecutor().catch((error) => {
  console.log(error);
  process.exit(1);
});
