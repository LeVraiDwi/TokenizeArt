import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import {
  keypairIdentity,
} from '@metaplex-foundation/umi'
import { Connection, PublicKey } from '@solana/web3.js'
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
console.log(`my key ${keypair.publicKey}`)


//transfert the token
// const receiver = UmiPubKey("5HrcAff6mEYWhFNmQd5ASXaNd1rBjbGSyGsYmtXfDEYn")
// const sig = createSignerFromKeypair(umi, keypair)
// const mint = UmiPubKey("76e7qMqAthvjnbPG8k1ANrzG9rcD5fYTEsVv74mZ7shd")
// await transferV1(umi, {
//   mint: mint,
//   authority: sig,
//   tokenOwner: keypair.publicKey,
//   destinationOwner: receiver,
//   tokenStandard: TokenStandard.NonFungible,
// }).sendAndConfirm(umi)

//get the owner
const connection = new Connection("https://api.devnet.solana.com");
const tokenMint = "AVapJEjitnwCoQepbZACwX8T244TtKhC91uA5MBygWmS";
const largestAccounts = await connection.getTokenLargestAccounts(
  new PublicKey(tokenMint)
);
const largestAccountInfo = await connection.getParsedAccountInfo(
  largestAccounts.value[0].address
);
console.log(largestAccountInfo?.value?.data);
const owner = largestAccountInfo?.value?.data?.parsed.info.owner;
console.log("NFT owner :", owner);
