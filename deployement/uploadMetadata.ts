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
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([42,94,42,161,250,122,73,247,57,71,98,32,20,190,208,183,119,213,28,168,78,32,240,116,72,56,208,28,110,168,131,238,221,214,45,189,54,19,96,110,56,56,104,60,184,86,112,145,7,226,51,53,181,9,195,72,196,15,134,191,27,30,133,12]))
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