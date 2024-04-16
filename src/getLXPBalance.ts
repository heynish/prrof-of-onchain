import { Abi, createPublicClient, http } from 'viem'
import { linea } from 'viem/chains'

const abi: Abi = [
  {
    inputs: [{ internalType: "address", name: "_keyOwner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]

export const getLXPBalance = async (user: `0x${string}`) => {
  const client = createPublicClient({
    chain: linea,
    transport: http(`https://linea-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`),
  });

  const args = [user];
  const balance = (await client.readContract({
    address: '0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A',
    abi: abi,
    functionName: "balanceOf",
    args,
  })) as number;
  const decimals = (await client.readContract({
    abi: abi,
    address: '0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A',
    functionName: "decimals",
  })) as number;
  return  (BigInt(balance) / (BigInt(10) ** BigInt(decimals)))
};
