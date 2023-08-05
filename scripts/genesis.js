const hre = require('hardhat')

async function deployMain() {
  const Factory = await hre.ethers.getContractFactory('MittariaGenesis')
  const res = await Factory.deploy()

  await res.deployed()

  console.log('Contract deployed to:', res.address)

  await new Promise((resolve) => setTimeout(resolve, 30000))

  await hre.run('verify:verify', {
    address: res.address,
    constructorArguments: [],
  })
}

deployMain()
