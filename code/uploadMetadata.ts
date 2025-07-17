import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import {
  keypairIdentity,
} from '@metaplex-foundation/umi'
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

const secretKeyString = fs.readFileSync("../wallet.json", { encoding: 'utf8' });
let keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(JSON.parse(secretKeyString)))
umi.use(keypairIdentity(keypair));

// Call upon umi's uploadJson function to upload our metadata to Arweave via Irys.
const raw = fs.readFileSync('../deployment/metadata.json');
const metadata = JSON.parse(raw.toString());
console.log(metadata);

const metadataUri = await umi.uploader.uploadJson(metadata).catch((e) => {
  throw e
})

console.log(`Metadata Uri: ${metadataUri}`)
