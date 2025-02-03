import { CHAIN, PUBLIC_CLIENT, transport } from "@/constants";
import { FACTORY_ABI } from "@/constants/factory";
import { Hex, createWalletClient, toHex, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export async function POST(req: Request) {
  const { id, pubKey } = (await req.json()) as { id: Hex; pubKey: [Hex, Hex] };

  const account = privateKeyToAccount(
    "0x7e2c9f7fa3434573fab6c4a79d2bde961a6fd157948af196755471c470032569",
  );
  const walletClient = createWalletClient({
    account,
    chain: CHAIN,
    transport,
  });

  const user = await PUBLIC_CLIENT.readContract({
    address: "0x606B4096c1fC70c3c829eB9c44Ab0EaFC0C6717E",
    abi: FACTORY_ABI,
    functionName: "getUser",
    args: [BigInt(id)],
  });

  if (user.account !== zeroAddress) {
    return Response.json(undefined);
  }

  await walletClient.writeContract({
    address: "0x606B4096c1fC70c3c829eB9c44Ab0EaFC0C6717E",
    abi: FACTORY_ABI,
    functionName: "saveUser",
    args: [BigInt(id), pubKey],
  });

  const smartWalletAddress = await PUBLIC_CLIENT.readContract({
    address: "0x606B4096c1fC70c3c829eB9c44Ab0EaFC0C6717E",
    abi: FACTORY_ABI,
    functionName: "getAddress",
    args: [pubKey],
  });

  // await walletClient.sendTransaction({
  //   to: smartWalletAddress,
  //   value: BigInt(1),
  // });

  const createdUser = {
    id,
    account: smartWalletAddress,
    pubKey,
  };

  return Response.json(createdUser);
}
