import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import {
  generateSigner,
  keypairIdentity,
  percentAmount,
} from '@metaplex-foundation/umi'
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs';

// Create Umi and tell it to use Irys
const umi = createUmi('https://api.devnet.solana.com')
  .use(
    irysUploader({
      // mainnet address: "https://node1.irys.xyz"
      // devnet address: "https://devnet.irys.xyz"
      address: 'https://devnet.irys.xyz',
    })
  )
umi.use(mplTokenMetadata());

const secretKeyString = fs.readFileSync("../wallet.json", { encoding: 'utf8' });
let keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(JSON.parse(secretKeyString)))
umi.use(keypairIdentity(keypair));

// We generate a signer for the Nft
const nftSigner = generateSigner(umi)

const tx = await createNft(umi, {
  mint: nftSigner,
  sellerFeeBasisPoints: percentAmount(5),
  name: '42NFT',
  uri: "https://gateway.irys.xyz/DaGbnz6rTHXzmq6hbVatH5LLnrKgmJidhqCmGryXCmS9",
  creators: [{ address: keypair.publicKey, verified: true, share: 100 }],
}).sendAndConfirm(umi)

// finally we can deserialize the signature that we can check on chain.
console.log(base58.deserialize(tx.signature)[0])
