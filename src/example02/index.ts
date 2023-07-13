import * as dotenv from "dotenv";
import { OpenAI } from "langchain";

// EXAMPLE DESCRIPTION: Simple use of LLM with a high temperature

dotenv.config();

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

async function generateCompanyName() {
  const res = await model.call(
    "What would be a good company name a company that makes colorful socks?"
  );

  console.log(res);
}

generateCompanyName().catch((error) => {
  console.log(error);
  process.exit(1);
});
