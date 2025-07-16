import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';
import {
  generateSigner,
  createSignerFromKeypair,
  keypairIdentity,
  percentAmount,
  publicKey as UmiPubKey,
  signerIdentity,
  signerPayer,
  Keypair as UmiKeypair
} from '@metaplex-foundation/umi'
import { createNft, mplTokenMetadata, transferV1, TokenStandard, } from '@metaplex-foundation/mpl-token-metadata'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { Keypair, Connection, PublicKey } from '@solana/web3.js'
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
const tokenMint = "9R8M5wbo3F24vg5mzk4VTrShN9Uwgdi4feVSevPujtGe";
const largestAccounts = await connection.getTokenLargestAccounts(
  new PublicKey(tokenMint)
);
const largestAccountInfo = await connection.getParsedAccountInfo(
  largestAccounts.value[0].address
);
console.log(largestAccountInfo?.value?.data);
const owner = largestAccountInfo?.value?.data?.parsed.info.owner;
console.log("NFT owner :", owner);
