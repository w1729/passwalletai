import { createPublicClient, http } from "viem";
import { sepolia, baseSepolia, mainnet,modeSepolia } from "viem/chains";

export const CHAIN = {
  ...baseSepolia,
};

export const transport = http("https://sepolia.mode.network");

export const PUBLIC_CLIENT = createPublicClient({
  chain: modeSepolia,
  transport,
});

export const MAINNET_PUBLIC_CLIENT = createPublicClient({
  chain: mainnet,
  transport: http(),
});
