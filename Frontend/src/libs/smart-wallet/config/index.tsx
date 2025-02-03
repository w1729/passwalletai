import { fallback, http } from "viem";

// const publicRpc = http("https://goerli.base.org");
// const localhost = http("http://localhost:8545");
const stackUpBundlerRpcUrl = http(
  `https://34443.rpc.thirdweb.com/${process.env.THIRDWEB_API_KEY}`,
);

export const transport = stackUpBundlerRpcUrl;
