import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import {
  generateSigner,
  keypairIdentity,
  Keypair
} from '@metaplex-foundation/umi'
// Create Umi and tell it to use Irys
const umi = createUmi('https://api.devnet.solana.com')
  .use(
    irysUploader({
      // mainnet address: "https://node1.irys.xyz"
      // devnet address: "https://devnet.irys.xyz"
      address: 'https://devnet.irys.xyz',
    })
  )

const signer = generateSigner(umi)
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([]))
umi.use(keypairIdentity(keypair));

// Call upon umi's uploadJson function to upload our metadata to Arweave via Irys.
const metadata = {
  "name": "42NFT",
  "description": "This is an NFT on Solana, for project tokenizerArt",
  "image": "https://gateway.irys.xyz/AseavN44JbX7NL9iASyMkdjopK5xoyjWPTDAndAZbTcL",
  "external_url": "https://raw.githubusercontent.com/LeVraiDwi/TokenizeArt/refs/heads/main/metada.json",
  "attributes": [],
  "properties": {
    "files": [
      {
        "uri": "https://gateway.irys.xyz/AseavN44JbX7NL9iASyMkdjopK5xoyjWPTDAndAZbTcL",
        "type": "image/png"
      }
    ],
    "category": "image"
  }
}

const metadataUri = await umi.uploader.uploadJson(metadata).catch((e) => {
  throw e
})

console.log(`Metadata Uri: ${metadataUri}`)
