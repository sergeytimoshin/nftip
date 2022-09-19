import "hardhat-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";


const func = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getUnnamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const [ deployer ] = await getUnnamedAccounts();

  const resolverAddr = (await deployments.get("UMADisputeResolver")).address;


  await deploy("ERC721Rent", {
    from: deployer,
    args: [resolverAddr],
    log: true,
    skipIfAlreadyDeployed: false,
  });
};
module.exports = func;
func.tags = ["ERC721Rent"];
func.dependencies = ["UMADisputeResolver"];
