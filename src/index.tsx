import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/middlewares'
import {addToWhiteList, mintNFT} from './phosphor'
import 'dotenv/config';

const MINT_URL = 'https://app.phosphor.xyz/26cf2af6-7dbf-45b7-8d0c-0f59b58463a4/drops/bf728add-c57e-4b37-8490-70936e5d10d9/ecbe8ed8-f5df-42c9-9bb8-4ec6c302753a/52f5ce4c-f107-4687-bf29-54490f9fdd85'
const MIN_LXP_BALANCE = 0

const neynarMiddleware = neynar({
  apiKey: 'NEYNAR_FROG_FM',
  features: ['interactor', 'cast'],
})

export const app = new Frog()

app.frame('/', async (c) => {
  return c.res({
    action: '/faucet',
    image: '/ETHBerlin-2024_Farcaster-Frames_01.png',
    intents: [
      <Button value="get-started">Get Started</Button>,
    ]
  })
})

app.frame('/faucet', async (c) => {
  return c.res({
    action: '/dili',
    image: '/ETHBerlin-2024_Farcaster-Frames_02.png',
    intents: [
      <Button.Link href="https://app.infura.io/register">Sign up</Button.Link>,
      <Button.Link href="https://www.infura.io/faucet/linea">Claim ETH</Button.Link>,
      <Button value="next">CTF and NFT mint</Button>,
    ]
  })
})

app.frame('/dili', async (c) => {
  const content = () => (
    <p style={{ fontSize: 26 }}>Solve the puzzle in the code of the contract linked below to get the secret.</p>
  );
  return c.res({
    image: '/ETHBerlin-2024_Farcaster-Frames_03.png',
    intents: [
      <TextInput placeholder="Enter the secret..."/>,
      <Button.Link href={process.env.CONTRACT_URL?.toString() ?? ''}>Puzzle Contract</Button.Link>,
      <Button action='/verify' value="next">Submit Answer</Button>,
    ]
  })
})


app.frame('/verify', neynarMiddleware,
async (c) => {
  const { inputText} = c
  // Verify Dili Secret
  if (inputText !== process.env.DILI_SECRET) {
    return c.res({
      action: '/verify',
      image: '/ETHBerlin-2024_Farcaster-Frames_04.png',
      intents: [
        <TextInput placeholder="Enter the secret..." />,
        <Button.Link href={process.env.CONTRACT_URL?.toString() ?? ''}>Puzzle Contract</Button.Link>,
        <Button value="next">Submit Answer</Button>,
        ]
    })
  }
  return c.res({
    image: '/ETHBerlin-2024_Farcaster-Frames_06.png',
    action:'/mint',
    intents: [
      <Button value="mint">Mint</Button>,
    ]
  })
})

app.frame('/mint',neynarMiddleware,
  async (c) => {
    try {
      const addresses = c.var.interactor?.verifiedAddresses?.ethAddresses || [];
      // if addresses[0] is empty then use the custodyAddress
      const address = addresses.length > 0 && addresses[0] ? addresses[0] : c.var.interactor?.custodyAddress || "";
      const listing_id = process.env.LISTING_ID?.toString() || '';
      await addToWhiteList(address, listing_id);
      await mintNFT(address, listing_id);

      stayIdle(1000);
      return c.res({
        image: '/ETHBerlin-2024_Farcaster-Frames_11.png',
      })
    } catch (e: any) {
      console.log(e);
      return c.res({
        action:'/',
        image:'/ETHBerlin-2024_Farcaster-Frames_error.png',
        intents: [<Button>Back to Home</Button>],
      });
    }
})

export const stayIdle = (delayInMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayInMs));


const isCloudflareWorker = typeof caches !== 'undefined'
if (isCloudflareWorker) {
  // @ts-ignore
  const manifest = await import('__STATIC_CONTENT_MANIFEST')
  const serveStaticOptions = { manifest, root: './' }
  app.use('/*', serveStatic(serveStaticOptions))
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions })
} else {
  devtools(app, { serveStatic })
}

export default app
