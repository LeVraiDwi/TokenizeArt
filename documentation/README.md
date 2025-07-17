# How to deploy a NFT

## set your Wallet
  set your private key in a wallet.json file a the root of the repertory:

```
touch ./wallet.json
```
looks like this
```
[1,2,30,400,52, ...]
```
## Set up npm
install module:
```
npm install
```

## Upload the image on DataChain
  DataChains are a bit like blockchain but they are opimise to store bigger data.
So here want to store the picture that we use has a NFT
open the file ./code/uploadImg.ts
set the good path to the picture
```
// use `fs` to read file via a string path.
// You will need to understand the concept of pathing from a computing perspective.
const imageFile = fs.readFileSync("PathToPicture");
```

move in th code folder and launch this cmd
```
cd code
npm run uploadImg
```

keep the url return:
```
new img uri: https://gateway.irys.xyz/AseavN44JbX7NL9iASyMkdjopK5xoyjWPTDAndAZbTcL
```

## Upload the metadata on DataChain
  we want to do the same thing with the metadata link to the NFT.
you can find a exemple in ./deployement/metadata.json.
a good habbit is to store this data online, on github for exemple.
open the file ./code/uploadMetadata.ts

set the metadata has desire. !don't froget to set the uri to img!
Exemple:
```
{
  "name": "42NFT",
  "description": "This is an NFT on Solana, for project tokenizerArt",
  "image": "ImgUri",
  "external_url": "https://raw.githubusercontent.com/LeVraiDwi/TokenizeArt/refs/heads/main/metada.json",
  "attributes": [
    {
      "artist" : "tcosse"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "ImgUri",
        "type": "image/png"
      }
    ],
    "category": "image"
  }
}
```

move in the code folder and launch this cmd
```
cd code
npm run uploadMeta
```

keep the url return:
```
Metadata Uri: https://gateway.irys.xyz/4EdLYopHC6AdPD8p9pvUEsCutCTHgKLwERtGH4mY2yPW
```

## Create the Nft
  Here we gonna create and mint our nft.
Go in the file ./code/index.ts

set the uri to metadata:
```
const tx = await createNft(umi, {
  mint: nftSigner,
  sellerFeeBasisPoints: percentAmount(5),
  name: '42NFT',
  uri: "UriMetaData",
  creators: [{ address: keypair.publicKey, verified: true, share: 100 }],
}).sendAndConfirm(umi)
```

move in th code folder and launch this cmd
```
cd code
npm run createNft
```

it will display the transaction:
```
R9qaiPeAjhRNY9k6zucBAr9gXmw8AThAbnLRbGQMUceujoYyJQsSSiTEAYfLVkZ2xhMgeAaWmwkL9oz8hTYDKTC
```

you can check it on Solana Explorer : https://explorer.solana.com/?cluster=devnet

normaly you will find a newly create nft like that:
https://explorer.solana.com/address/9R8M5wbo3F24vg5mzk4VTrShN9Uwgdi4feVSevPujtGe?cluster=devnet

## Check ownerships
  you can check the ownership with the function in Utils:
set the mint with the addresse of your nft:
```
const tokenMint = "NTFAddr";
```

Run:
```
npm run dothing
```
it should display the account that have been use to create the nft.