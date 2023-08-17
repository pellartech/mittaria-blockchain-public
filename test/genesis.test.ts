import { ethers, network } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'

import { MittariaGenesis, MittariaGenesis__factory } from '../typechain-types'
import moment from 'moment'

chai.use(solidity)
chai.use(chaiAsPromised)
const { expect } = chai

const publicPhase = 0
const firstPrivatePhase = 1

describe('Mittaria Genesis ERC721', () => {
  let accounts: SignerWithAddress[]
  let mainContract: MittariaGenesis
  let owner: SignerWithAddress, bob: SignerWithAddress, alice: SignerWithAddress

  const phaseConfigs = {
    quantity: 100,
    maxPerTxn: 1,
    startTime: 1,
    endTime: moment.utc().add(1, 'days').unix(),
    price: ethers.utils.parseEther('0.1'),
  }

  before(async () => {
    accounts = await ethers.getSigners()
    owner = accounts[0]
    bob = accounts[1]
    alice = accounts[2]
  })

  beforeEach(async () => {
    await network.provider.send('hardhat_reset')

    const _factory = (await ethers.getContractFactory('MittariaGenesis', owner)) as MittariaGenesis__factory
    mainContract = await _factory.deploy()
    await mainContract.deployed()

    expect(mainContract.address).to.properAddress

    // console.log(Number((await res.deployTransaction.wait()).gasUsed))
  })

  context('Test case for init data', () => {
    it('Init data should be correct', async () => {})
  })

  context('Test case for function setTotalSupply', () => {
    it('setTotalSupply should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setTotalSupply(10)).revertedWith('Ownable: caller is not the owner')
    })
    it('setTotalSupply should be correct', async () => {
      await (await mainContract.connect(owner).setTotalSupply(10)).wait()

      expect(await mainContract.maxSupply()).equal(10)
    })
  })

  context('Test case for function setExecutor', () => {
    it('setExecutor should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setExecutor([bob.address], true)).revertedWith('Ownable: caller is not the owner')
    })
    it('setExecutor should be correct', async () => {
      await (await mainContract.connect(owner).setExecutor([bob.address], true)).wait()

      expect(await mainContract.executors(bob.address)).equal(true)
    })
  })

  context('Test case for function setVerifier', () => {
    it('setVerifier should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setVerifier(bob.address)).revertedWith('Ownable: caller is not the owner')
    })
    it('setVerifier should be correct', async () => {
      await (await mainContract.connect(owner).setVerifier(bob.address)).wait()

      expect(await mainContract.verifier()).equal(bob.address)
    })
  })

  context('Test case for function toggleTokenURI', () => {
    it('toggleTokenURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).toggleTokenURI(true)).revertedWith('Ownable: caller is not the owner')
    })
    it('toggleTokenURI should be correct', async () => {
      await (await mainContract.connect(owner).toggleTokenURI(true)).wait()

      expect(await mainContract.enableTokenURI()).equal(true)
    })
  })

  context('Test case for function toggleBackupURI', () => {
    it('toggleBackupURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).toggleBackupURI(true)).revertedWith('Ownable: caller is not the owner')
    })
    it('toggleBackupURI should be correct', async () => {
      await (await mainContract.connect(owner).toggleBackupURI(true)).wait()

      expect(await mainContract.enableBackupURI()).equal(true)
    })
  })

  context('Test case for function toggleHtmlURI', () => {
    it('toggleHtmlURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).toggleHtmlURI(true)).revertedWith('Ownable: caller is not the owner')
    })
    it('toggleHtmlURI should be correct', async () => {
      await (await mainContract.connect(owner).toggleHtmlURI(true)).wait()

      expect(await mainContract.enableHtmlURI()).equal(true)
    })
  })

  context('Test case for function toggleReveal', () => {
    it('toggleReveal should be revert without owner', async () => {
      await expect(mainContract.connect(bob).toggleReveal(true)).revertedWith('Ownable: caller is not the owner')
    })
    it('toggleReveal should be correct', async () => {
      await (await mainContract.connect(owner).toggleReveal(true)).wait()

      expect(await mainContract.revealed()).equal(true)
    })
  })

  context('Test case for function setBaseURI', () => {
    it('setBaseURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setBaseURI('abcs')).revertedWith('Not allowed operator')
    })
    it('setBaseURI should be correct', async () => {
      await (await mainContract.connect(owner).setBaseURI('abcs')).wait()

      expect(await mainContract.baseURI()).equal('abcs')

      await mainContract.connect(owner).setExecutor([bob.address], true)
      await (await mainContract.connect(bob).setBaseURI('abcs-2')).wait()
      expect(await mainContract.baseURI()).equal('abcs-2')
    })
  })

  context('Test case for function setBackupURI', () => {
    it('setBackupURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setBackupURI('abcs')).revertedWith('Not allowed operator')
    })
    it('setBackupURI should be correct', async () => {
      await (await mainContract.connect(owner).setBackupURI('abcs')).wait()

      expect(await mainContract.backupURI()).equal('abcs')

      await mainContract.connect(owner).setExecutor([bob.address], true)
      await (await mainContract.connect(bob).setBackupURI('abcs-2')).wait()
      expect(await mainContract.backupURI()).equal('abcs-2')
    })
  })

  context('Test case for function setHtmlURI', () => {
    it('setHtmlURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setHtmlURI('abcs')).revertedWith('Not allowed operator')
    })
    it('setHtmlURI should be correct', async () => {
      await (await mainContract.connect(owner).setHtmlURI('abcs')).wait()

      expect(await mainContract.htmlURI()).equal('abcs')

      await mainContract.connect(owner).setExecutor([bob.address], true)
      await (await mainContract.connect(bob).setHtmlURI('abcs-2')).wait()
      expect(await mainContract.htmlURI()).equal('abcs-2')
    })
  })

  context('Test case for function setTokensURI', () => {
    it('setTokensURI should be revert without owner', async () => {
      await expect(mainContract.connect(bob).setTokensURI([0, 1], ['--0', '--1'])).revertedWith('Not allowed operator')
    })
    it('setTokensURI should be revert without valid input', async () => {
      await expect(mainContract.connect(owner).setTokensURI([0], ['--0', '--1'])).revertedWith('Input mismatch')
    })
    it('setTokensURI should be correct', async () => {
      await (await mainContract.connect(owner).setTokensURI([0, 1], ['--0', '--1'])).wait()

      expect(await mainContract.token2URI(0)).equal('--0')
      expect(await mainContract.token2URI(1)).equal('--1')

      await mainContract.connect(owner).setExecutor([bob.address], true)
      await (await mainContract.connect(bob).setTokensURI([0, 1], ['--0-2', '--1-2'])).wait()
      expect(await mainContract.token2URI(0)).equal('--0-2')
      expect(await mainContract.token2URI(1)).equal('--1-2')
    })
  })

  context('Test case for function createMintingPhase', () => {
    it('createMintingPhase should be revert without owner', async () => {
      await expect(mainContract.connect(bob).createMintingPhase(phaseConfigs)).revertedWith('Ownable: caller is not the owner')
    })
    it('createMintingPhase should be correct', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const phaseInfo = await mainContract.getPhaseInfo(firstPrivatePhase)

      const configs = phaseInfo.configs
      expect(configs.quantity).equal(phaseConfigs.quantity)
      expect(configs.maxPerTxn).equal(phaseConfigs.maxPerTxn)
      expect(configs.startTime).equal(phaseConfigs.startTime)
      expect(configs.endTime).equal(phaseConfigs.endTime)
      expect(configs.price).equal(phaseConfigs.price)

      expect(phaseInfo.version).equal(0)
      expect(phaseInfo.totalMinted).equal(0)
    })
  })

  context('Test case for function updateMintingPhase', () => {
    it('updateMintingPhase should be revert without owner', async () => {
      await expect(mainContract.connect(bob).updateMintingPhase(firstPrivatePhase, phaseConfigs)).revertedWith('Ownable: caller is not the owner')
    })
    it('updateMintingPhase should be correct', async () => {
      await expect(mainContract.connect(owner).updateMintingPhase(firstPrivatePhase, phaseConfigs)).revertedWith('Invalid phase id')
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)
      const newPhaseConfigs = {
        ...phaseConfigs,
        quantity: 200,
        maxPerTxn: 2,
        startTime: 2,
        endTime: moment.utc().add(2, 'days').unix(),
        price: ethers.utils.parseEther('0.2'),
      }
      await mainContract.connect(owner).updateMintingPhase(firstPrivatePhase, newPhaseConfigs)

      const phaseInfo = await mainContract.getPhaseInfo(firstPrivatePhase)

      const configs = phaseInfo.configs
      expect(configs.quantity).equal(newPhaseConfigs.quantity)
      expect(configs.maxPerTxn).equal(newPhaseConfigs.maxPerTxn)
      expect(configs.startTime).equal(newPhaseConfigs.startTime)
      expect(configs.endTime).equal(newPhaseConfigs.endTime)
      expect(configs.price).equal(newPhaseConfigs.price)

      expect(phaseInfo.version).equal(1)
      expect(phaseInfo.totalMinted).equal(0)
    })
  })

  context('Test case for function toggleReveal', () => {
    it('toggleReveal should be revert without owner', async () => {
      await expect(mainContract.connect(bob).toggleReveal(true)).revertedWith('Ownable: caller is not the owner')
    })
    it('toggleReveal should be correct', async () => {
      await (await mainContract.connect(owner).toggleReveal(true)).wait()

      expect(await mainContract.revealed()).equal(true)
    })
  })

  context('Test case for function mint', () => {
    it('mint should be revert without valid amount', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const message = ethers.utils.solidityKeccak256(['uint256', 'bytes32'], [1337, ethers.utils.solidityKeccak256(['uint256', 'uint16', 'address', 'uint16'], [0, 0, alice.address, 1])])
      const signature = await owner.signMessage(ethers.utils.arrayify(message))
      await expect(mainContract.connect(alice).mint(firstPrivatePhase, 101, 1, signature)).revertedWith('Exceed quantity')
    })

    it('mint should be revert without sale not active', async () => {
      await mainContract.connect(owner).createMintingPhase({
        ...phaseConfigs,
        startTime: moment.utc().add(1, 'days').unix(),
        endTime: moment.utc().add(2, 'days').unix(),
      })

      const message = ethers.utils.solidityKeccak256(['uint256', 'bytes32'], [1337, ethers.utils.solidityKeccak256(['uint256', 'uint16', 'address', 'uint16'], [0, 0, alice.address, 1])])
      const signature = await owner.signMessage(ethers.utils.arrayify(message))
      await expect(mainContract.connect(alice).mint(firstPrivatePhase, 1, 1, signature)).revertedWith('Not started')
    })

    it('mint should be revert with exceed txn', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const message = ethers.utils.solidityKeccak256(['uint256', 'bytes32'], [1337, ethers.utils.solidityKeccak256(['uint256', 'uint16', 'address', 'uint16'], [0, 0, alice.address, 1])])
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      // mine and set time
      await network.provider.send('evm_increaseTime', [10000000])
      await expect(mainContract.connect(alice).mint(firstPrivatePhase, 1, 1, signature)).revertedWith('Ended')
    })

    it('mint should be revert with exceed max per txn', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const message = ethers.utils.solidityKeccak256(['uint256', 'bytes32'], [1337, ethers.utils.solidityKeccak256(['uint256', 'uint16', 'address', 'uint16'], [0, 0, alice.address, 1])])
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      await expect(mainContract.connect(alice).mint(firstPrivatePhase, 2, 1, signature)).revertedWith('Exceed max per txn')
    })

    it('mint should be revert with exceed max per wallet', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const message = ethers.utils.solidityKeccak256(
        ['uint256', 'bytes32'],
        [
          1337,
          ethers.utils.arrayify(
            ethers.utils.keccak256(
              ethers.utils.defaultAbiCoder.encode(
                [
                  'uint256', //
                  'uint16',
                  'address',
                  'uint16',
                ],
                [firstPrivatePhase, 0, alice.address, 1]
              )
            )
          ),
        ]
      )
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      await mainContract.connect(alice).mint(firstPrivatePhase, 1, 1, signature, {
        value: ethers.utils.parseEther('0.1'),
      })
      await expect(
        mainContract.connect(alice).mint(firstPrivatePhase, 1, 1, signature, {
          value: ethers.utils.parseEther('0.1'),
        })
      ).revertedWith('Exceed max per wallet')
    })

    it('mint should be revert with invalid price', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const message = ethers.utils.solidityKeccak256(['uint256', 'bytes32'], [1337, ethers.utils.solidityKeccak256(['uint256', 'uint16', 'address', 'uint16'], [0, 0, alice.address, 1])])
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      await expect(mainContract.connect(alice).mint(firstPrivatePhase, 1, 1, signature)).revertedWith('Invalid price')
    })

    it('mint should be revert without eligible', async () => {
      await mainContract.connect(owner).createMintingPhase(phaseConfigs)

      const message = ethers.utils.solidityKeccak256(['uint256', 'bytes32'], [1337, ethers.utils.solidityKeccak256(['uint256', 'uint16', 'address', 'uint16'], [0, 0, alice.address, 1])])
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      await expect(
        mainContract.connect(bob).mint(firstPrivatePhase, 1, 1, signature, {
          value: ethers.utils.parseEther('0.1'),
        })
      ).revertedWith('Invalid proof')
    })

    it('mint should be revert with exceed maxSupply', async () => {
      await mainContract.connect(owner).createMintingPhase({
        ...phaseConfigs,
        maxPerTxn: 1000,
      })

      await mainContract.connect(owner).setTotalSupply(11)

      const message = ethers.utils.solidityKeccak256(
        ['uint256', 'bytes32'],
        [
          1337,
          ethers.utils.arrayify(
            ethers.utils.keccak256(
              ethers.utils.defaultAbiCoder.encode(
                [
                  'uint256', //
                  'uint16',
                  'address',
                  'uint16',
                ],
                [firstPrivatePhase, 0, alice.address, 1000]
              )
            )
          ),
        ]
      )
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      await mainContract.connect(alice).mint(firstPrivatePhase, 10, 1000, signature, {
        value: ethers.utils.parseEther('1'),
      })

      await expect(
        mainContract.connect(alice).mint(firstPrivatePhase, 2, 1000, signature, {
          value: ethers.utils.parseEther('0.2'),
        })
      ).revertedWith('Exceed max supply')

      await mainContract.connect(owner).setTotalSupply(12)

      await mainContract.connect(alice).mint(firstPrivatePhase, 2, 1000, signature, {
        value: ethers.utils.parseEther('0.2'),
      })
    })

    it('mint should be success', async () => {
      await mainContract.connect(owner).createMintingPhase({
        ...phaseConfigs,
        maxPerTxn: 1000,
      })

      const message = ethers.utils.solidityKeccak256(
        ['uint256', 'bytes32'],
        [
          1337,
          ethers.utils.arrayify(
            ethers.utils.keccak256(
              ethers.utils.defaultAbiCoder.encode(
                [
                  'uint256', //
                  'uint16',
                  'address',
                  'uint16',
                ],
                [firstPrivatePhase, 0, alice.address, 1000]
              )
            )
          ),
        ]
      )
      const signature = await owner.signMessage(ethers.utils.arrayify(message))

      const tx = await (
        await mainContract.connect(alice).mint(firstPrivatePhase, 10, 1000, signature, {
          value: ethers.utils.parseEther('1'),
        })
      ).wait()
      console.log('txn', Number(tx.gasUsed))

      expect(await mainContract.balanceOf(alice.address)).equal(10)
      const phaseInfo = await mainContract.getPhaseInfo(firstPrivatePhase)
      expect(phaseInfo.totalMinted).equal(10)
      const minted = await mainContract.getTokenMintedByAccount(1, alice.address)
      expect(minted).equal(10)
    })
  })

  context('Test case for function mintTo', () => {
    it('mintTo should be success', async () => {
      await mainContract.connect(owner).updateMintingPhase(publicPhase, {
        quantity: 100,
        maxPerTxn: 100,
        startTime: 1,
        endTime: moment.utc().add(1, 'days').unix(),
        price: ethers.utils.parseEther('2'),
      })

      const tx = await (
        await mainContract.connect(alice).mintTo(bob.address, 11, {
          value: ethers.utils.parseEther('2').mul(11),
        })
      ).wait()
      console.log('txn', Number(tx.gasUsed))

      expect(await mainContract.balanceOf(bob.address)).equal(11)
      const phaseInfo = await mainContract.getPhaseInfo(publicPhase)
      expect(phaseInfo.totalMinted).equal(11)
      const minted = await mainContract.getTokenMintedByAccount(publicPhase, bob.address)
      expect(minted).equal(11)
    })
  })

  context('Test case for function adminMintTo', () => {
    it('adminMintTo should be revert without owner', async () => {
      await expect(mainContract.connect(bob).adminMintTo(alice.address, 1)).revertedWith('Ownable: caller is not the owner')
    })
    it('adminMintTo should be correct', async () => {
      const txn = await (await mainContract.connect(owner).adminMintTo(alice.address, 1)).wait()
      console.log(Number(txn.gasUsed))
      expect(await mainContract.balanceOf(alice.address)).equal(1)
    })
  })
})
