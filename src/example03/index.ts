import * as dotenv from "dotenv";
import { OpenAI, PromptTemplate, LLMChain } from "langchain";

// EXAMPLE DESCRIPTION: Combine LLMs and Prompts using a LLMChain

dotenv.config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template,
  inputVariables: ["product"],
});

const chain = new LLMChain({ llm: model, prompt });
const product = "single use airplanes";

async function printPrompt() {
  const res = await prompt.format({ product });
  console.log(res);
}

async function generateCompanyName() {
  const res = await chain.call({ product });
  console.log(res);
}

printPrompt().catch((error) => {
  console.log(error);
  process.exit(1);
});

generateCompanyName().catch((error) => {
  console.log(error);
  process.exit(1);
});
