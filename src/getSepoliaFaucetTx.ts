import { createPublicClient, GetLogsReturnType, http, parseAbiItem } from 'viem'
import { lineaSepolia } from 'viem/chains'

export const getSepoliaFaucetTx = async (user: `0x${string}`) => {
  const client = createPublicClient({
    chain: lineaSepolia,
    transport: http(`https://linea-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`),
  });

  const logs = await client.getLogs({
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    args: {
      from: '0x422f72b27819798986f41c1bede24e76114de584',
      to: user
    },
    fromBlock: 'earliest',
    toBlock: 'latest'
  }).catch(err => console.log(err));

  return (logs as GetLogsReturnType<any, any, any, any, any>).length > 0
};
