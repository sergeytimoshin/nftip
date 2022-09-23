import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  mocha: {
    timeout: 100000000
  },
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:7545",
      accounts: ["af95f2bae4f40004626a119a509137e4ecd6b994ad38ec217a49cd4dd519c137", "39469a0054dbe96b7c4b726daf3dee09b2aca5c15cf4e8e28ef05982764fa73f"]
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/eiaqcE7pB3Y71H7jJEmrWYNYBo-HCz13",
      saveDeployments: true,
      accounts: ["e3da20934f1dfbdc7c3bcc9e9e238cafb65471837482ccc8de79392dd004f2a9"],
    }
  },
};

export default config;


try {
  require("./tasks")
} catch (_) {
  console.error("Failed to import tasks");
}
