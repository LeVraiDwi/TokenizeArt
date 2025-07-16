import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { createGenericFile, generateSigner, sol, keypairIdentity, } from '@metaplex-foundation/umi';
import fs from 'fs';
// Create Umi and tell it to use Irys
const umi = createUmi('https://api.devnet.solana.com')
    .use(irysUploader({
    // mainnet address: "https://node1.irys.xyz"
    // devnet address: "https://devnet.irys.xyz"
    address: 'https://devnet.irys.xyz',
}));
const signer = generateSigner(umi);
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([]));
umi.use(keypairIdentity(keypair));

// use `fs` to read file via a string path.
// You will need to understand the concept of pathing from a computing perspective.
const imageFile = fs.readFileSync("/sgoinfre/goinfre/Perso/tcosse/TokenizeArt/deployement/cardCat.png");
console.log(imageFile);
// Use `createGenericFile` to transform the file into a `GenericFile` type
// that umi can understand. Make sure you set the mimi tag type correctly
// otherwise Arweave will not know how to display your image.
const umiImageFile = createGenericFile(imageFile, 'my-image.jpeg', {
    tags: [{ name: 'Content-Type', value: 'image/jpeg' }],
});
console.log(umiImageFile);
// Here we upload the image to Arweave via Irys and we get returned a uri
// address where the file is located. You can log this out but as the
// uploader can takes an array of files it also returns an array of uris.
// To get the uri we want we can call index [0] in the array.
const imageUri = await umi.uploader.upload([umiImageFile]).catch((e) => {
    throw new Error(e);
});

console.log(imageUri);
console.log(`new img uri: ${imageUri[0]}`);
