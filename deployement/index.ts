import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import {
  generateSigner,
  keypairIdentity,
  percentAmount,
} from '@metaplex-foundation/umi'
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { base58 } from '@metaplex-foundation/umi/serializers'
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
const signer = generateSigner(umi)
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([42,94,42,161,250,122,73,247,57,71,98,32,20,190,208,183,119,213,28,168,78,32,240,116,72,56,208,28,110,168,131,238,221,214,45,189,54,19,96,110,56,56,104,60,184,86,112,145,7,226,51,53,181,9,195,72,196,15,134,191,27,30,133,12]))
umi.use(keypairIdentity(keypair));

// We generate a signer for the Nft
const nftSigner = generateSigner(umi)

const tx = await createNft(umi, {
  mint: nftSigner,
  sellerFeeBasisPoints: percentAmount(5),
  name: '42NFT',
  uri: "https://gateway.irys.xyz/J8Vzhy1AXbskNBjmvLoaTSe7A9Tjf2tUXCaMpzL6NaG1",
  creators: [{ address: keypair.publicKey, verified: true, share: 100 }],
}).sendAndConfirm(umi)

// finally we can deserialize the signature that we can check on chain.
console.log(base58.deserialize(tx.signature)[0])
