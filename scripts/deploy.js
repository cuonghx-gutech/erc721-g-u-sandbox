
const hre = require("hardhat");


async function main() {
 
  const [deployer] = await hre.ethers.getSigners();

  const ERC721GUSandbox = await hre.ethers.getContractFactory("ERC721GUSandbox");
  const TransferProxy = await hre.ethers.getContractFactory("TransferProxy");
  const ERC721LazyMintTransferProxy = await hre.ethers.getContractFactory('ERC721LazyMintTransferProxy');

  const transferProxy = await TransferProxy.deploy();
  const erc721LazyMintTransferProxy = await ERC721LazyMintTransferProxy.deploy();

  const erc721Proxy = await hre.upgrades.deployProxy(ERC721GUSandbox, [
    "GUnft", "GUN", "ipfs:/", "", transferProxy.address, erc721LazyMintTransferProxy.address
  ], {
    deployer: deployer.address,
    initializer: '__ERC721Rarible_init'
  });
  console.log("deployed erc721 at", erc721Proxy.address); // 0x03135c7BB57912946414b1Fe33DEaD999Df711D4
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

