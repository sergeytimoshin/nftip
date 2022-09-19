import "hardhat-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";


const func = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getUnnamedAccounts } = hre;
  const { deploy } = deployments;

  const [ deployer ] = await getUnnamedAccounts();

  await deploy("TestERC721", {
    from: deployer,
    args: [],
    log: true,
    skipIfAlreadyDeployed: false,
  });
};
module.exports = func;
func.tags = ["TestERC721"];
// func.dependencies = [];
