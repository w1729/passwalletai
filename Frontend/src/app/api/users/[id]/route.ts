import { PUBLIC_CLIENT } from "@/constants/client";
import { FACTORY_ABI } from "@/constants/factory";
import { Hex, stringify, toHex } from "viem";

export async function GET(_req: Request, { params }: { params: { id: Hex } }) {
  const { id } = params;
  if (!id) {
    return Response.json(JSON.parse(stringify({ error: "id is required" })));
  }

  const user = await PUBLIC_CLIENT.readContract({
    address: "0x606B4096c1fC70c3c829eB9c44Ab0EaFC0C6717E" as Hex,
    abi: FACTORY_ABI,
    functionName: "getUser",
    args: [BigInt(id)],
  });

  //const balance = await PUBLIC_CLIENT.getBalance({ address: user.account });
  let balance = BigInt(0);

  // Using etherscan api instead of getBalance as Sepolia rcp node is not inconsistent
  if (user?.account) {
    const result = await fetch(
      `https://api-sepolia.basescan.org/api?module=account&action=balance&address=${user.account}&tag=latest&apikey=7X874Z66BMKVZCBS84QNWN1D4FW1VBG87I`,
      { cache: "no-store" },
    );
    const resultJSON = await result.json();
    balance = BigInt(resultJSON?.result || 0);
  }

  return Response.json(JSON.parse(stringify({ ...user, id: toHex(user.id), balance })));
}
