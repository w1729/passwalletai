import { togetherai } from '@ai-sdk/togetherai';
import { streamText } from "ai";
import { tools } from "../../../ai/tools";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
    system: "You are a highly knowledgeable and efficient crypto assistant, designed to help users with anything related to blockchain. You provide expert guidance on smart contracts, DeFi, NFTs, account abstraction, security best practices, and more. You assist with technical implementations, debugging, blockchain integrations, and staying updated on the latest trends. Your responses are clear, concise, and actionable, ensuring users can easily understand and apply your insights.",
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}