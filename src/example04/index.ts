import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, Calculator } from "langchain/tools";

// EXAMPLE DESCRIPTION: Use an Agent with SerpAPI and Calculator tools

dotenv.config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const tools = [
  new SerpAPI(process.env.SERP_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

async function callAgent() {
  const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description"
  );
  console.log("Loaded agent.");

  const input =
    "Who is Olivia Wilde's boyfriend? " +
    "What is his current age raised to the 0.23 power?";
  console.log(`Executing with input "${input}"`);

  const res = await executor.call({ input });
  console.log(`Got output "${res.output}"`);
}

callAgent().catch((error) => {
  console.log(error);
  process.exit(1);
});
