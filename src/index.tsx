import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/middlewares'
import { getLXPBalance } from './getLXPBalance.ts'

const MINT_URL = 'https://app.phosphor.xyz/26cf2af6-7dbf-45b7-8d0c-0f59b58463a4/drops/bf728add-c57e-4b37-8490-70936e5d10d9/ecbe8ed8-f5df-42c9-9bb8-4ec6c302753a/52f5ce4c-f107-4687-bf29-54490f9fdd85'

const neynarMiddleware = neynar({
  apiKey: 'NEYNAR_FROG_FM',
  features: ['interactor', 'cast'],
})

export const app = new Frog()

app.frame('/', async (c) => {
  return c.res({
    action: '/faucet',
    image: '/frame_0_welcome.png',
    intents: [
      <Button value="get-started">Get Started</Button>,
    ]
  })
})

app.frame('/faucet', async (c) => {
  return c.res({
    action: '/dili',
    image: '/frame_1_infura_linea_faucet.png',
    intents: [
      <Button.Link href="https://app.infura.io/register">Sign up</Button.Link>,
      <Button.Link href="https://www.infura.io/faucet/linea">Claim ETH</Button.Link>,
      <Button value="next">Next</Button>,
    ]
  })
})

app.frame('/dili', async (c) => {
  return c.res({
    action: '/verify',
    image: '/frame_2_dili_secret_.png',
    intents: [
      <TextInput placeholder="Enter the secret..."/>,
      <Button value="next">Next</Button>,
    ]
  })
})


app.frame('/verify', neynarMiddleware,async (c) => {
  const { inputText} = c
  // Verify Dili Secret
  if (inputText !== process.env.DILI_SECRET) {
    return c.res({
      action: '/verify',
      image: '/frame_3_verify_false_no_results.png',
      intents: [
        <TextInput placeholder="Enter the secret..." />,
        <Button value="next">Verify</Button>,
        ]
    })
  }

  // Verify LXP Balance
  const addresses = c.var.interactor?.verifiedAddresses?.ethAddresses || []
  const lxpBalance = (
    await Promise.all(
      addresses.map((userAddress: string) => {
        return getLXPBalance(
          userAddress as `0x${string}`
        );
      })
    )
  ).reduce((acc, balance) => acc + BigInt(balance), BigInt(0));

  console.log(Number(lxpBalance))
  if (Number(lxpBalance) <= 0) {
    return c.res({
      action: '/verify',
      image: '/frame_3_verify_false_no_results.png',
      intents: [
        <TextInput placeholder="Enter the secret..." />,
        <Button value="next">Verify</Button>,
      ]
    })
  }

  return c.res({
    image: '/frame_3_verify_true_no_results.png',
    intents: [
      <Button.Link href={MINT_URL}>Mint</Button.Link>,
    ]
  })
})

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
